function $mol_viewer_tree2ts( tree : $mol_tree ) {
	
	var content = ''
	
	tree.childs.forEach( function( def : $mol_tree ) {
		if( !def.type || /^-/.test( def.type ) ) return
		if( !/^\$\w+$/.test( def.type ) ) throw new Error( 'Wrong component name: ' + def + def.uri )
		var parent = def.childs[0]
		
		var members : { [ key : string ] : string } = {}
		parent.childs.forEach( param => addProp( param ) )
		
		function addProp( param : $mol_tree ) {
			var needKey = false
			var needSet = false
			var needReturn = true
			var needCache = false
			var isOverride = false
			var keys : string[] = []

			if( param.type === '>' ) {
				needCache = true
				isOverride = true
				param = param.childs[0]
			}

			if( param.type === '<' ) {
				needCache = false
				isOverride = true
				param = param.childs[0]
			}

			if( !param.type || /^-/.test( param.type ) ) return
			
			function getValue( value : $mol_tree ) {
				switch( value.type[0] ) {
					case void 0 :
						return JSON.stringify( value.value )
					case '-' :
						return null
					case '/' :
						var items : string[] = []
						value.childs.forEach( item => {
							if( item.type === '-' ) return
							var val = getValue( item )
							if( val ) items.push( val )
						} )
						return '[].concat( ' + items.join(' , ') + ' )'
					case '$' :
						needCache = true
						var overs : string[] = []
						value.childs.forEach( over => {
							if( /^(-|$)/.test( over.type ) ) return ''
							var overName = /(.*?)(#?)$/.exec( over.type )
							var ns = needSet
							var v = getValue( over.childs[0] )
							let args : string[] = []
							if( overName[2] ) args.push( ' key : any ' )
							if( needSet ) args.push( ' ...diff : any[] ' )
							overs.push( '\t\t\t__.' + overName[1] + ' = (' + args.join( ',' ) + ') => ' + v + '\n' )
							needSet = ns
						} )
						return 'new ' + value.type + '().setup( __ => { \n' + overs.join( '' ) + '\t\t} )'
					case '*' :
						needKey = true
						needReturn = false
						var opts : string[] = []
						value.childs.forEach( opt => {
							if( /^(-|$)/.test( opt.type ) ) return ''
							keys.push( opt.type )
							opts.push( '\t\t\tcase "' + opt.type + '" : return ' + getValue( opt.childs[0] ) + '\n' )
						} )
						if( !isOverride ) return 'switch( key ){\n' + opts.join( '' ) + '\t\t}\n\t\treturn <any>null'
						else return 'switch( key ){\n' + opts.join( '' ) + '\t\t\tdefault: return super.' + param.type + '( key' + ( needSet ? ' , ...diff' : '' ) + ' )\n\t\t}'
					case ':' :
						return '( <any> ' + JSON.stringify( value.childs[0] ) + ' )'
					case '>' :
						needSet = true
						if( value.childs.length === 1 ) {
							addProp( value )
							var type = /(.*?)(#?)$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '( ' + ( type[2] ? 'key ,' : '' ) + ' ...diff )'
						}
					case '<' :
						if( value.childs.length === 1 ) {
							addProp( value )
							var type = /(.*?)(#?)$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '(' + ( type[2] ? ' key ' : '' ) + ')'
						}
				}
				
				switch( value.type ) {
					case 'true' :
					case 'false' :
						return value.type
					case 'null' :
						return '<any> null'
				}
				
				if( Number( value.type ).toString() == value.type ) return value.type
				
				throw new Error( 'Wrong value: ' + value + value.uri )
			}
			
			if( param.childs.length > 1 ) throw new Error( 'Too more childs: ' + param + param.uri )
			
			param.childs.forEach( child => {
				var val = getValue( child )
				//if( !child.type ) val = 'this.text( ' + JSON.stringify(def.type+'_'+param.type) + ' )'
				var propName = /(.*?)(#?)$/.exec( param.type )
				var args : string[] = []
				if( needKey || propName[2] ) args.push( ' key : any ' )
				if( needCache || needSet ) args.push( ' ...diff : any[] ' )
				if( needCache ) val = ( needReturn ? '( diff[0] !== void 0 ) ? diff[0] : ' : 'if( diff[0] !== void 0 ) return diff[0]\n\t\t' ) + val
				if( needReturn ) val = 'return ' + val
				var decl = '\t' + propName[1] +'(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n'
				if( needCache ) decl = '\t@ $' + 'mol_prop()\n' + decl
				decl = source( param ).toString().trim().replace( /^/gm , '\t/// ' ) + '\n' + decl
				members[ propName[1] ] = decl
				if( needKey ) {
					if( isOverride ) members[ propName[1] + '_keys' ] = '\t' + propName[1] +'_keys(){\n\t\treturn <string[]>' + JSON.stringify( keys ) + '.concat( super.' + propName[1] +'_keys() || [] )\n\t}\n\n'
					else members[ propName[1] + '_keys' ] = '\t' + propName[1] +'_keys(){\n\t\treturn <string[]>' + JSON.stringify( keys ) + '\n\t}\n\n'
				}
			} )
			
			function source( root : $mol_tree ) : $mol_tree {
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
			return members[ name ] || '\t' + name +'() { return <any>null }\n\t}\n'
		}).join( '' )
		
		var classes = 'module $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n'
		
		content += classes + '\n'
	})
	
	return content
}
