namespace $ {

	export function $mol_view_tree_trim_remarks( def : $mol_tree ) {
		return def.transform( ( [ node ] , sub )=> ( node.type === '-' ) ? null : node.clone({ sub : sub() }) )
	}

	export function $mol_view_tree_classes( defs : $mol_tree ) {
		return $mol_view_tree_trim_remarks( defs )
	}

	export function $mol_view_tree_class_name( val : $mol_tree ) {
		return val.type
	}

	export function $mol_view_tree_super_name( val : $mol_tree ) {
		if( val.sub.length != 1 ) throw val.error( 'Wrong sub count' )
		return val.sub[0].type
	}

	export function $mol_view_tree_class_props( def : $mol_tree ) {
		const props : { [ key : string ] : $mol_tree } = {}
		
		const catch_prop = ( prop : $mol_tree )=> {
			if( prop.sub.length === 0 ) return
			if( prop.sub[0].type === '-' ) return
					
			props[ prop.type ] = props[ prop.type ]

			const def = prop.clone({
				sub : [ prop.sub[0].transform( ( [ node , ... stack ] , sub )=> {

					if( [ '<=' , '<=>' , '=>' ].indexOf( node.type ) === -1 ) return node.clone({ sub : sub() })
					
					catch_prop( node.sub[0] )

					return node.clone({
						sub : [ node.sub[0].clone({
							sub : [
								node.sub[0].clone({
									type : '-' ,
									sub : [] ,
								})
							]
						}) ]
					})
					
				} )]
			})

			if( props[ prop.type ] ) {
				if( props[ prop.type ].toString() !== def.toString() ) {
					throw def.error( 'Property already defined with another default value' )
				}
			} else {
				props[ prop.type ] = def
			}
		}

		def.sub[0].sub.map( catch_prop )
		
		return def.clone({
			type : '' ,
			sub : Object.keys( props ).map( name => props[ name ] ) ,
		})

	}

	export function $mol_view_tree_prop_name( prop : $mol_tree ) {
		return ( prop.type.match( /^\w+/ ) || [] )[0] || ''
	}

	export function $mol_view_tree_prop_key( prop : $mol_tree ) {
		return ( prop.type.match( /!(\w+)$/ ) || [] )[1] || ''
	}

	export function $mol_view_tree_prop_next( prop : $mol_tree ) {
		return ( prop.type.match( /\?(\w+)$/ ) || [] )[1] || ''
	}

	export function $mol_view_tree_prop_value( prop : $mol_tree ) {
		if( prop.sub.length != 1 ) throw prop.error( `Wrong sub count (${ prop.sub.length })` )
		return prop.sub[0]
	}

	export function $mol_view_tree_value_type( val : $mol_tree ) {
		
		switch( val.type ) {
			case 'true' : return 'bool'
			case 'false' : return 'bool'
			case 'null' : return 'null'
			case '*' : return 'dict'
			case '/' : return 'list'
			case '@' : return 'locale'
			case '' : return 'string'
			case '<=' : return 'get'
			case '<=>' : return 'bind'
			case '=>' : return 'put'
		}

		if( val.type[0] === '$' ) return 'object'

		if( Number( val.type ).toString() == val.type ) return 'number'

		throw val.error( 'Wrong value' )
	}

	export function $mol_view_tree_compile( tree : $mol_tree ) {
		
		var content = ''
		var locales : { [ key : string ] : string } = {}
		
		for( let def of $mol_view_tree_classes( tree ).sub ) {
			if( !/^\$\w+$/.test( def.type ) ) throw def.error( 'Wrong component name' )
			
			var parent = def.sub[0]
			
			var propDefs : { [ key : string ] : $mol_tree } = {}
			var members : { [ key : string ] : string } = {}
			
			for( let param of $mol_view_tree_class_props( def ).sub ) { try {
				var needSet = false
				var needReturn = true
				var needCache = false
				var keys : string[] = []
	
				if( param.type === '<=>' ) {
					param = param.sub[0]
				}
	
				if( param.type === '<=' ) {
					param = param.sub[0]
				}
				
				var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( param.type )
				
				if( propName[3] ) {
					needSet = true
					needCache = true
				}
				
				const getValue = ( value : $mol_tree )=> { try {
					switch( true ) {
						case( value.type === '' ) :
							return JSON.stringify( value.value )
						case( value.type === '@' ) :
							const key = `${ def.type }_${ param.type.replace( /[?!].*/ , '' ) }`
							locales[ key ] = value.value
							return`$mol_locale.text( ${ JSON.stringify( key ) } )`
						case( value.type === '-' ) :
							return null
						case( value.type === '/' ) :
							var items : string[] = []
							value.sub.forEach( item => {
								if( item.type === '-' ) return
								if( item.type === '^' ) {
									items.push( `...super.${ param.type }()` )
									return
								}
								var val = getValue( item )
								if( val ) items.push( val )
							} )
							return '[]' + ( items.length ? '.concat( ' + items.join(' , ') + ' )' : ' as any[]' )
						case( value.type[0] === '$' ) :
							needCache = true
							var overs : string[] = []
							value.sub.forEach( over => {
								if( /^-?$/.test( over.type ) ) return ''
								var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( over.type )
								var ns = needSet
								
								if( over.sub[0].type === '=>' ) {
									if( over.sub[0].sub.length === 1 ) {
										const method_name = over.sub[0].sub[0].type
										members[ method_name ] = `\t${ method_name }(){\n\t\treturn this.${ param.type }().${ over.type }()\n\t}\n\n`
										 return
									}
								}
								
								var v = getValue( over.sub[0] )
								let args : string[] = []
								if( overName[2] ) args.push( ` ${ overName[2] } : any ` )
								if( overName[3] ) args.push( ` ${ overName[3] }? : any ` )
								overs.push( '\t\t\tobj.' + overName[1] + ' = (' + args.join( ',' ) + ') => ' + v + '\n' )
								needSet = ns
							} )
							return '(( obj )=>{\n' + overs.join( '' ) + '\t\t\treturn obj\n\t\t})( new this.$.' + value.type + ' )'
						case( value.type === '*' ) :
							//needReturn = false
							var opts : string[] = []
							value.sub.forEach( opt => {
								if( opt.type === '-' ) return ''
								if( opt.type === '^' ) {
									opts.push( `\t\t\t...super.${ param.type }() ,\n` )
									return
								}
								
								var key = /(.*?)(?:\?(\w+))?$/.exec( opt.type )
								keys.push( key[1] )
								var ns = needSet
								var v = getValue( opt.sub[0] )
								var arg = key[2] ? ` ( ${ key[2] }? : any )=> ` : ''
								opts.push( '\t\t\t"' + key[1] + '" : ' + arg + ' ' + v + ' ,\n' )
								needSet = ns
							} )
							return '({\n' + opts.join( '' ) + '\t\t})'
						case( value.type === '>' ) :
							throw new Error( 'Deprecated syntax `>`. Use `<=>` instead.' )
						case( value.type === '<=>' ) :
							needSet = true
							if( value.sub.length === 1 ) {
								var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec( value.sub[0].type )
								return 'this.' + type[1] + '(' + ( type[2] ? type[2] + ' ,' : '' ) + ' ' + type[3] + ' )'
							}
							break
						case( value.type === '<' ) :
							throw new Error( 'Deprecated syntax `<`. Use `<=` instead.' )
						case( value.type === '<=' ) :
							if( value.sub.length === 1 ) {
								var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( value.sub[0].type )
								return 'this.' + type[1] + '(' + (  type[2] ? type[2] : '' ) + ')'
							}
							break
					}
					
					switch( value.type ) {
						case 'true' :
						case 'false' :
							return value.type
						case 'null' :
							return 'null as any'
					}
					
					if( Number( value.type ).toString() == value.type ) return value.type
					
					throw value.error( 'Wrong value' )
				} catch ( err ) {
					err.message += `\n${value.baseUri}:${value.row}:${value.col}\n${ value }`
					throw err
				} }
				
				if( param.sub.length > 1 ) throw new Error( 'Too more sub' )
				if( param.sub.length < 1 ) throw new Error( 'Need default value (use "-" for inherit)' )
				
				param.sub.forEach( child => {
					var val = getValue( child )
					if( !val ) return
					
					propDefs[ propName[1] ] = param
					
					var args : string[] = []
					if( propName[2] ) args.push( ` ${ propName[2] } : any ` )
					if( propName[3] ) args.push( ` ${ propName[3] }? : any , force? : $${''}mol_atom_force ` )
					if( needSet && param.sub[0].type !== '<=>' ) val = ( needReturn ? `( ${ propName[3] } !== void 0 ) ? ${ propName[3] } : ` : `if( ${ propName[3] } !== void 0 ) return ${ propName[3] }\n\t\t` ) + val
					if( needReturn ) val = 'return ' + val
					var decl = '\t' + propName[1] +'(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n'
					if( needCache ) {
						if( propName[2] ) decl = '\t@ $' + 'mol_mem_key\n' + decl
						else decl = '\t@ $' + 'mol_mem\n' + decl
					}
					decl = param.toString().trim().replace( /^/gm , '\t/// ' ) + '\n' + decl
					
					members[ propName[1] ] = decl
				} )
				
			} catch ( err ) {
				err.message += `\n${param.baseUri}:${param.row}:${param.col}\n${ param }`
				throw err
			} }
			
			var body = Object.keys( members ).map( function( name ) {
				return members[ name ] || '\t' + name +'() { return null as any }\n\t}\n'
			}).join( '' )
			
			var classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n'
			
			content += classes + '\n'
		}
		
		return { script : content , locales : locales }
	}

}
