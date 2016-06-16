function $mol_viewer_tree2ts( tree ) {
	
	var content = ''
	
	tree.childs.forEach( function( def ) {
		if( !def.type || /^-/.test( def.type ) ) return
		if( !/^\$\w+$/.test( def.type ) ) throw new Error( 'Wrong component name: ' + def + def.uri )
		var parent = def.childs[0]
		
		var members = {}
		parent.childs.forEach( function( param ) { addProp( param ) } )
		
		function addProp( param ) {
			if( !param.type || /^-/.test( param.type ) ) return
			
			var needKey = false
			var needSet = true
			var needCache = false
			var needReturn = true
			var keys = []
			
			function getValue( value ) {
				switch( value.type[0] ) {
					case void 0 :
						return JSON.stringify( value.value )
					case '-' :
						return null
					case '/' :
						var items = []
						value.childs.forEach( function( item ) {
							var val = getValue( item )
							if( val ) items.push( val )
						} )
						return '$'+'mol_range([]).concat( ' + items.join(' , ') + ' )'
					case '$' :
						needCache = true
						var overs = []
						value.childs.forEach( function( over ) {
							if( /^(-|$)/.test( over.type ) ) return ''
							overs.push( '\t\t_.' + over.type + ' = ( ...diff : any[] ) => ' + getValue( over.childs[0] ) + '\n' )
						} )
						return 'new ' + value.type + '().setup( _ => { \n' + overs.join( '' ) + '\t} )'
					case '*' :
						needKey = true
						needReturn = false
						var opts = []
						value.childs.forEach( function( opt ) {
							if( /^(-|$)/.test( opt.type ) ) return ''
							keys.push( opt.type )
							opts.push( '\t\tcase "' + opt.type + '" : return ' + getValue( opt.childs[0] ) + '\n' )
						} )
						return 'switch( key ){\n' + opts.join( '' ) + '\t\tdefault: return super.' + param.type + '( key )\n\t}'
					case ':' :
						return '( ' + JSON.stringify( value.childs[0] ) + ' )'
					case '>' :
						needSet = true
						if( value.childs.length === 1 ) {
							addProp( value.childs[0] )
							return 'this.' + value.childs[0].type + '( ...diff )'
						}
					case '<' :
						if( value.childs.length === 1 ) {
							addProp( value.childs[0] )
							return 'this.' + value.childs[0].type + '()'
						}
					default :
						throw new Error( 'Wrong value: ' + value + value.uri )
				}
			}
			
			if( param.childs.length > 1 ) throw new Error( 'Too more childs: ' + param + param.uri )
			
			param.childs.forEach( function( child ) {
				var val = getValue( child )
				var args = []
				if( needKey ) args.push( ' key : any ' )
				if( needSet ) args.push( ' ...diff : any[] ' )
				if( needReturn ) val = 'return ' + val
				var decl = '\t' + param.type +'(' + args.join(',') + ') { ' + val + ' }\n\n'
				if( needCache ) decl = '\t@ $' + 'mol_prop()\n' + decl
				members[ param.type ] = decl
				if( needKey ) {
					members[ param.type + '_keys' ] = '\t' + param.type +'_keys(){\n\t\treturn ( super.' + param.type +'_keys() || [] ).concat( ' + JSON.stringify( keys ) + ' )\n\t}\n\n'
				}
			} )
		}
		
		var body = Object.keys( members ).map( function( name ) {
			return members[ name ] || '\t' + name +'() { return null }\n\t}\n'
		}).join( '' )
		
		var classes = 'module $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n'
		
		content += classes + '\n'
	})
	
	return content
}
