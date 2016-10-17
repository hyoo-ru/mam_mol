module $ {

export function $mol_viewer_tree2ts( tree : $mol_tree ) {
	
	var content = ''
	var locales : { [ key : string ] : string } = {}
	
	function error( message : string , tree : $mol_tree ) {
		return new Error( `${message}: ${tree} ${tree.baseUri}:${tree.row}:${tree.col}` )
	}
	
	tree.childs.forEach( function( def : $mol_tree ) {
		if( !def.type || /^-/.test( def.type ) ) return
		if( !/^\$\w+$/.test( def.type ) ) throw error( 'Wrong component name' , def )
		var parent = def.childs[0]
		
		var members : { [ key : string ] : string } = {}
		parent.childs.forEach( param => addProp( param ) )
		
		function addProp( param : $mol_tree ) {
			var needSet = false
			var needReturn = true
			var needCache = false
			var isOverride = true
			var keys : string[] = []

			if( param.type === '>' ) {
				needCache = true
				needSet = true
				isOverride = false
				param = param.childs[0]
			}

			if( param.type === '<' ) {
				needCache = false
				isOverride = false
				param = param.childs[0]
			}

			if( !param.type || /^-/.test( param.type ) ) return
			
			function getValue( value : $mol_tree ) {
				switch( value.type[0] ) {
					case void 0 :
						return JSON.stringify( value.value )
					case '@' :
						locales[ `${ def.type }_${ param.type }` ] = value.value
						return`this.text( ${ JSON.stringify( param.type ) } )`
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
							if( needSet ) args.push( ' next? , prev? ' )
							overs.push( '\t\t\t__.' + overName[1] + ' = (' + args.join( ',' ) + ') => ' + v + '\n' )
							needSet = ns
						} )
						return 'new ' + value.type + '().setup( __ => { \n' + overs.join( '' ) + '\t\t} )'
					case '*' :
						//needReturn = false
						var opts : string[] = []
						value.childs.forEach( opt => {
							if( /^(-|$)/.test( opt.type ) ) return ''
							keys.push( opt.type )
							var ns = needSet
							var v = getValue( opt.childs[0] )
							var arg = needSet ? ' next? : any , prev? : any ' : ''
							opts.push( '\t\t\t"' + opt.type + '" : (' + arg + ')=> <any> ' + v + ' ,\n' )
							needSet = ns
						} )
						if( !isOverride ) return '({\n' + opts.join( '' ) + '\t\t})'
						else return  `$`+`mol_merge_dict( super.${ param.type }() , {\n${ opts.join( '' )}\t\t} )`
					case '>' :
						needSet = true
						if( value.childs.length === 1 ) {
							addProp( value )
							var type = /(.*?)(?:(#)(.*))?$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '(' + ( type[3] ? JSON.stringify( type[3] ) + ' ,' : type[2] ? ' key ,' : '' ) + ' next , prev )'
						}
					case '<' :
						if( value.childs.length === 1 ) {
							addProp( value )
							var type = /(.*?)(?:(#)(.*))?$/.exec( value.childs[0].type )
							return 'this.' + type[1] + '(' + (  type[3] ? JSON.stringify( type[3] ) : type[2] ? ' key ' : '' ) + ')'
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
				
				throw error( 'Wrong value' , value )
			}
			
			if( param.childs.length > 1 ) throw error( 'Too more childs' , param )
			
			param.childs.forEach( child => {
				var val = getValue( child )
				var propName = /(.*?)(?:(#)(.*))?$/.exec( param.type )
				var args : string[] = []
				if( propName[2] ) args.push( ' key : any ' )
				if( needCache || needSet ) args.push( ' next? : any , prev? : any ' )
				if( needSet ) val = ( needReturn ? '( next !== void 0 ) ? next : ' : 'if( next !== void 0 ) return next\n\t\t' ) + val
				if( needReturn ) val = 'return ' + val
				var decl = '\t' + propName[1] +'(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n'
				if( needCache ) {
					if( propName[2] ) decl = '\t@ $' + 'mol_mem_key()\n' + decl
					else decl = '\t@ $' + 'mol_mem()\n' + decl
				}
				decl = source( param ).toString().trim().replace( /^/gm , '\t/// ' ) + '\n' + decl
				members[ propName[1] ] = decl
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
	
	return { script : content , locales : locales }
}

}
