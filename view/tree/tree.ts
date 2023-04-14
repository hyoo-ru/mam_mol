namespace $ {

	export function $mol_view_tree_trim_remarks( def : $mol_tree ) {
		return def.transform( ( [ node ] , sub )=> ( node.type === '-' ) ? null : node.clone({ sub : sub() }) )!
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
		
		const catch_prop = ( prop : $mol_tree , type = '' )=> {

			let def = prop
			
			if( type === '=>' ) {
				if( prop.sub[0] ) throw prop.error( 'Right binding can not have default value' )
			} else {

				if( prop.sub.length === 0 ) return
				if( prop.sub[0].type === '-' ) return
						
				props[ prop.type ] = props[ prop.type ]

				def = prop.clone({
					sub : [ prop.sub[0].transform( ( [ node , ... stack ] , sub )=> {

						if( [ '<=' , '<=>' , '=>' ].indexOf( node.type ) === -1 ) return node.clone({ sub : sub() })
						
						catch_prop( node.sub[0] , node.type )

						return node.clone({
							sub : [ node.sub[0].clone({
								sub : []
							}) ]
						})
						
					} )!]
				})

			}

			if( props[ prop.type ] ) {
				if( props[ prop.type ].toString() !== def.toString() ) {
					throw def.error( 'Property already defined with another default value' + props[ prop.type ].error('').message + '\n---' )
				}
			} else {
				props[ prop.type ] = def
			}
		}

		def.sub[0].sub.map( sub => catch_prop( sub ) )
		
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
			case '@' : return 'locale'
			case '' : return 'string'
			case '<=' : return 'get'
			case '<=>' : return 'bind'
			case '=>' : return 'put'
		}

		switch( val.type[0] ) {
			case '/' : return 'list'
			case '$' : return 'object'
		}

		if( Number( val.type ).toString() == val.type ) return 'number'

		throw val.error( 'Wrong value' )
	}

	export function $mol_view_tree_compile( tree : $mol_tree) {
		const splittedUri = tree.uri.split(/[#\\\/]/)
		splittedUri.pop()
		const fileName = splittedUri.pop()!

		const SourceNode = ( row : number , col : number , fileName : string , text : string ) => text
		
		var content: string[] = []
		var locales :Record<string, string> = {}
		
		for( let def of $mol_view_tree_classes( tree ).sub ) {
			if( !/^\$\w+$/.test( def.type ) ) throw def.error( 'Wrong component name' )
			
			const parent = def.sub[0]
			
			const members : Record<string, string[]> = {}
			
			for( let param of $mol_view_tree_class_props( def ).sub ) { try {
				var needSet = false
				var needCache = false
	
				if( param.type === '<=>' ) {
					param = param.sub[0]
				}
	
				if( param.type === '<=' ) {
					param = param.sub[0]
				}
				
				var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( param.type )!
				
				if( propName[3] ) {
					needSet = true
					needCache = true
				}
				
				const getValue = ( value : $mol_tree , definition? : boolean ) : string[] | null=> { try {
					switch( true ) {
						case( value.type === '' ) :
							return [JSON.stringify( value.value )]
						case( value.type === '@' ) :
							const key = `${ def.type }_${ param.type.replace( /[?!].*/ , '' ) }`
							locales[ key ] = value.value
							return [`this.$.$mol_locale.text( ${ JSON.stringify( key ) } )`]
						case( value.type === '-' ) :
							return null
						case( value.type[0] === '/' ) :
							const item_type = value.type.substring( 1 )
							var items : string[] = []
							value.sub.forEach( item => {
								if( item.type === '-' ) return
								if( item.type === '^' ) {
									items.push( `...super.${ param.type }()` )
									return
								}
								var val = getValue( item )
								if( val ) items.push( val.join("") )
							} )
							return [`[`, items.join(' , '),  `]` , ( item_type ? ` as ( ${ item_type } )[]` : ` as any[]` )]
						case( value.type[0] === '$' ) :
							if( !definition ) throw value.error( 'Objects should be bound' )
							needCache = true
							const overs : string[] = []
							value.sub.forEach( over => {
								if( /^[-\/]?$/.test( over.type ) ) return ''
								var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( over.type )!
								var ns = needSet
								
								if( over.sub[0].type === '=>' ) {
									if( over.sub[0].sub.length === 1 ) {
										
										const [ , own_name , own_key , own_next ] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( over.sub[0].sub[0].type )!
										
										let own_args : string[] = []
										if( own_key ) own_args.push( ` ${own_key} : any ` )
										if( own_next ) own_args.push( ` ${own_next}? : any ` )

										let [ , their_name , ... their_args ] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( over.type )!
										their_args = their_args.filter( Boolean )
										
										members[ own_name ] = [`\t${ own_name }(${ own_args.join(',') }) {\n\t\treturn this.${ propName[1] }(${ propName[2] || '' }).${ their_name }( ${ their_args.join(' , ') } )\n\t}\n\n`]
										return
									}
								}
								
								var v = getValue( over.sub[0] )
								let args : string[] = []
								if( overName[2] ) args.push( ` ${ overName[2] } : any ` )
								if( overName[3] ) args.push( ` ${ overName[3] }? : any ` )
								overs.push( ...['\t\t\tobj.' , SourceNode(over.row, over.col, fileName, overName[1]), ' = (', args.join( ',' ), ') => ' , ...(v || []) , '\n'] )
								needSet = ns
							} )
							const object_args = value.select( '/' , '' ).sub.map( arg => getValue( arg ) ).join( ' , ' ) as string
							return ['(( obj )=>{\n', ...overs, '\t\t\treturn obj\n\t\t})( new this.$.', SourceNode(value.row, value.col, fileName, value.type) , '( ' , object_args , ' ) )']
						case( value.type === '*' ) :
							const opts : string[] = []

							for (const opt of value.sub) {
								if( opt.type === '-' ) continue 
								if( opt.type === '^' ) {
									opts.push( `\t\t\t...super.${ param.type }() ,\n` )
									continue
								}
								
								const key = /(.*?)(?:\?(\w+))?$/.exec( opt.type )!
								const ns = needSet
								const v = getValue( opt.sub[0] )
								const arg = key[2] ? ` ( ${ key[2] }? : any )=> ` : ''
								opts.push( ...[
									'\t\t\t"',
									SourceNode(opt.row, opt.col, fileName, key[1]+ '" : '),
									arg,
									' ',
									...(v || []) ,
									' ,\n']
								)
								needSet = ns
							}

							return ['({\n', opts.join( '' ), '\t\t})']
						case( value.type === '<=>' ) :
							if( value.sub.length === 1 ) {
								var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec( value.sub[0].type )!
								return ['this.' + type[1] + '(' + ( type[2] ? type[2] + ' ,' : '' ) + ' ' + type[3] + ' )']
							}
							break
						case( value.type === '<=' ) :
							if( value.sub.length === 1 ) {
								var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec( value.sub[0].type )!
								return ['this.' + type[1] + '(' + (  type[2] ? type[2] : '' ) + ')']
							}
							break
					}
					
					switch( value.type ) {
						case 'true' :
						case 'false' :
							return [value.type]
						case 'null' :
							return ['null as any']
					}
					
					if( Number( value.type ).toString() == value.type ) return [value.type]
					
					throw value.error( 'Wrong value' )
				} catch ( err ) {
					// err.message += `\n${value.baseUri}:${value.row}:${value.col}\n${ value }`
					throw err
				} }
				
				if( param.sub.length > 1 ) throw new Error( 'Too more sub' )
				param.sub.forEach( child => {
					var val = getValue( child , true )
					if( !val ) return
					
					// propDefs[ propName[1] ] = param
					
					var args : string[] = []
					if( propName[2] ) args.push( ` ${ propName[2] } : any ` )
					if( propName[3] ) args.push( ` ${ propName[3] }? : any , force? : $${''}mol_mem_force ` )

					if( needSet )  val = [
						`( ${ propName[3] } !== void 0 ) ? ${ propName[3] } : `,
						...val
					]
					val = ['return ', ...val]

					let decl: string[] = ['\t', SourceNode(param.row, param.col, fileName, propName[1]),'(', args.join(',') , ') {\n\t\t' , ...val , '\n\t}\n\n']
					if( needCache ) {
						if( propName[2] ) decl = ['\t@ $' , 'mol_mem_key\n', ...decl]
						else decl = ['\t@ $', 'mol_mem\n', ...decl]
					}
					decl = ['\t/**\n\t *  ```\n', param.toString().trim().replace( /^/mg , '\t *  ' ),  '\n\t *  ```\n\t **/\n' , ...decl]
					members[ propName[1] ] = decl
				} )
				
			} catch ( err ) {
				// err.message += `\n${param.baseUri}:${param.row}:${param.col}\n${ param }`
				throw err
			} }

			var body = Object.keys( members ).reduce( function( acc, name ) {
				const items = members[ name ] ? members[name] : ['\t' , name ,'() { return null as any }\n\t}\n']
				return [...acc, ...items]
			}, [] as string[])
			var classes: string[] = [ 'namespace $ { export class ', SourceNode(def.row, def.col, fileName, def.type ), ' extends ', SourceNode(parent.row, parent.col, fileName, parent.type), ' {\n\n', ...body, '} }\n'] 
			
			content = [...content, ...classes]
		}

		return { script : content.join('') , locales }

	}

}
