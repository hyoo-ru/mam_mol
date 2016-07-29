function $mol_viewer_tree2ts( tree ) {
	
	var content = ''
	
	tree.childs.forEach( function( def ) {
		if( !def.type || /^-/.test( def.type ) ) return
		if( !/^\$\w+$/.test( def.type ) ) throw new Error( 'Wrong component name: ' + def + def.uri )
		var parent = def.childs[0]
		
		var members = {}
		parent.childs.forEach( function( param ) { addProp( param ) } )
		
		function addProp( param , needCache = false ) {
			if( !param.type || /^-/.test( param.type ) ) return
			
			var needKey = false
			var needSet = false
			var needReturn = true
			var keys = []
			
			function getValue( value ) {
				switch( value.type[0] ) {
					case void 0 :
						needCache = true
						return JSON.stringify( value.value )
					case '-' :
						return null
					case '/' :
						var items = []
						value.childs.forEach( function( item ) {
							if( item.type === '-' ) return
							var val = getValue( item )
							if( [ '<' , '>' , 'null' ].indexOf( item.type ) !== -1 ) val = '$'+'mol_maybe(' + val + ').map( val => val.valueOf() )[0]'
							if( val ) items.push( val )
						} )
						return '[].concat( ' + items.join(' , ') + ' )'
					case '$' :
						needCache = true
						var overs = []
						value.childs.forEach( function( over ) {
							if( /^(-|$)/.test( over.type ) ) return ''
							var ns = needSet
							var v = getValue( over.childs[0] )
							overs.push( '\t\t\t__.' + over.type + ' = (' + ( needSet ? ' ...diff ' : '' ) + ') => ' + v + '\n' )
							needSet = ns
						} )
						return 'new ' + value.type + '().setup( __ => { \n' + overs.join( '' ) + '\t\t} )'
					case '*' :
						needKey = true
						needReturn = false
						var opts = []
						value.childs.forEach( function( opt ) {
							if( /^(-|$)/.test( opt.type ) ) return ''
							keys.push( opt.type )
							opts.push( '\t\t\tcase "' + opt.type + '" : return ' + getValue( opt.childs[0] ) + '\n' )
						} )
						return 'switch( key ){\n' + opts.join( '' ) + '\t\t\tdefault: return super["' + param.type + '"] && super["' + param.type + '"]( key' + ( needSet ? ' , ...diff' : '' ) + ' )\n\t\t}'
					case ':' :
						needCache = true
						return '( ' + JSON.stringify( value.childs[0] ) + ' )'
					case '>' :
						needSet = true
						if( value.childs.length === 1 ) {
							addProp( value.childs[0] , true )
							var type = /(.*?)(#?)$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '( ' + ( type[2] ? 'key ,' : '' ) + ' ...diff )'
						}
					case '<' :
						if( value.childs.length === 1 ) {
							addProp( value.childs[0] )
							var type = /(.*?)(#?)$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '(' + ( type[2] ? ' key ' : '' ) + ')'
						}
				}
				
				switch( value.type ) {
					case 'true' :
					case 'false' :
					case 'null' :
						return value.type
				}
				
				if( Number( value.type ) == value.type ) return value.type
				
				throw new Error( 'Wrong value: ' + value + value.uri )
			}
			
			if( param.childs.length > 1 ) throw new Error( 'Too more childs: ' + param + param.uri )
			
			param.childs.forEach( function( child ) {
				var val = getValue( child )
				//if( !child.type ) val = 'this.text( ' + JSON.stringify(def.type+'_'+param.type) + ' )'
				var propName = /(.*?)(#?)$/.exec( param.type )
				var args = []
				if( needKey || propName[2] ) args.push( ' key ' )
				if( needCache || needSet ) args.push( ' ...diff ' )
				if( needCache ) val = ( needReturn ? '( diff[0] !== void 0 ) ? diff[0] : ' : 'if( diff[0] !== void 0 ) return diff[0]\n\t\t' ) + val
				if( needReturn ) val = 'return ' + val
				var decl = '\t' + propName[1] +'(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n'
				if( needCache ) decl = '\t@ $' + 'mol_prop()\n' + decl
				decl = source( param ).toString().trim().replace( /^/gm , '\t/// ' ) + '\n' + decl
				members[ propName[1] ] = decl
				if( needKey ) {
					members[ propName[1] + '_keys' ] = '\t' + propName[1] +'_keys(){\n\t\treturn ' + JSON.stringify( keys ) + '.concat( super["' + propName[1] +'_keys"] && super["' + propName[1] +'_keys"]() || [] )\n\t}\n\n'
				}
			} )
			
			function source( root : $mol_tree ) {
				if( [ '>' , '<' ].indexOf( root.type ) !== -1 ) {
					return root.clone({
						childs : root.childs.map( name => name.clone({
							childs : []
						}) )
					})
				}
				return root.clone({ childs : root.childs.map( source ) })
			}
			
			return needSet
		}
		
		var body = Object.keys( members ).map( function( name ) {
			return members[ name ] || '\t' + name +'() { return null }\n\t}\n'
		}).join( '' )
		
		var classes = 'module $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n'
		
		content += classes + '\n'
	})
	
	return content
}
