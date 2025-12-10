namespace $ {

	export function $mol_style_sheet<
		Component extends $mol_view,
		Config extends $mol_style_guard< Component , Config >,
	>(
		Component : new()=> Component,
		config0 : Config ,
	) {

		let rules = [] as string[]

		const block = $mol_dom_qname( $mol_ambient({}).$mol_func_name( Component ) )
		const kebab = ( name : string )=> name.replace( /[A-Z]/g , letter => '-' + letter.toLowerCase() )

		const make_class = ( prefix : string , path : string[] , config : typeof config0 )=> {

			const props = [] as string[]

			const selector = ( prefix : string , path : string[] )=> {
				if( path.length === 0 ) return prefix || `[${ block }]`
				let res = `[${ block }_${ path.join('_') }]`
				if( prefix ) res =  prefix + ' :where(' + res + ')'
				return res
			}
			
			for( const key of Object.keys( config ).reverse() ) {

				if( /^(--)?[a-z]/.test(key) ) {
					
					const addProp = ( keys : string[] , val : any  )=> {

						if( Array.isArray( val ) ) {

							if( val[0] && [ Array , Object ].includes( val[0].constructor ) ) {
								val = val.map( v => {
									return Object.entries( v ).map( ([ n , a ])=> {
										if( a === true ) return kebab( n )
										if( a === false ) return null
										return String( a )
									} ).filter( Boolean ).join(' ')
								}).join( ',' )
							} else {
								val = val.join(' ')
							}

							props.push(`\t${ keys.join('-') }: ${ val };\n`)

						} else if( val.constructor === Object ) {

							for( let suffix of Object.keys( val ).reverse() ) {
								addProp( [ ... keys  , kebab( suffix ) ] , val[ suffix ] )
							}

						} else {

							props.push(`\t${ keys.join('-') }: ${ val };\n`)

						}
						
					}

					addProp( [ kebab(key) ] , (config as any)[key] )

				} else if( /^[A-Z]/.test(key) ) {

					make_class( prefix , [ ... path , key.toLowerCase() ] , (config as any)[key] )

				} else if( key[0] === '$' ) {

					make_class( selector( prefix , path ) + ' :where([' + $mol_dom_qname( key ) + '])' , [] , (config as any)[key] )

				} else if( key === '>' ) {

					const types = config[key] as any

					for( let type of Object.keys( types ).reverse() ) {
						make_class( selector( prefix , path ) + ' > :where([' + $mol_dom_qname( type ) + '])' , [] , types[type] )
					}

				} else if( key === '@' ) {

					const attrs = config[key] as any

					for( let name of Object.keys( attrs ).reverse() ) {
						for( let val in attrs[name] ) {
							make_class( selector( prefix , path ) + ':where([' + name + '=' + JSON.stringify( val ) + '])' , [] , attrs[name][val] )
						}
					}

				} else if ( key === "^" ) {
					const parents = config[key] as any
					class fake extends $mol_view { static name= "" }

					for ( let parent of Object.keys( parents ).reverse() ) {
						const styles = parents[parent]
						const css = $mol_style_sheet( fake, parent === ">" ? styles : { [parent]: styles } ).replaceAll("[]", "")
						const [ s, r ] = css.split(" {\n")

						rules.push( s.trim() + ( parent === ">" ? " > " : " " ) + selector( prefix, path ) + " {\n" + r)
					}
				} else if( key === '@media' ) {

					const media = (config as any)[key] as any

					for( let query of Object.keys( media ).reverse() ) {

						rules.push('}\n')
						
						make_class( prefix , path , media[query] )
						
						rules.push( `${ key } ${ query } {\n` )

					}

				} else if( key === '@starting-style' ) {

					const styles = (config as any)[key] as any
					rules.push('}\n')
					make_class( prefix , path , styles )
					rules.push( `${ key } {\n` )

				} else if( key[0] === '[' && key[key.length-1] === ']' ) {

					const attr = key.slice( 1, -1 )
					const vals = config[ key as any ] as any as Record< string, any >
					
					for( let val of Object.keys( vals ).reverse() ) {
						make_class( selector( prefix , path ) + ':where([' + attr + '=' + JSON.stringify( val ) + '])' , [] , vals[val] )
					}
				
				} else {

					make_class( selector( prefix , path ) + key , [] , (config as any)[key] )

				}

			}
			
			if( props.length ) {
				rules.push( `${ selector( prefix , path ) } {\n${ props.reverse().join('') }}\n` )
			}

		}

		make_class( '' , [] , config0 )

		return rules.reverse().join('')

	}

}
