namespace $ {

	type $mol_style_definition< Obj > = Partial< CSSStyleDeclaration & $mol_type_omit< {
		[ key in keyof Obj ] :
			Obj[ key ] extends ()=> infer T
			? ( unknown extends T
				? never
				: T extends $mol_view
					? $mol_style_definition< T >
					: never
			)
			: never
	} , unknown , never > >
	
	export function $mol_style<
		Component extends object
	>(
		Component : new()=> Component ,
		styles : $mol_style_definition< Component > ,
	) {

		let rules = [] as string[]

		const make_class = ( prefix : string , config : $mol_style_definition<any> )=> {

			const props = [] as string[]
			
			for( let key in config ) {

				if( /^[a-z]/.test(key) ) {

					const name = key.replace( /[A-Z]/ , letter => '-' + letter.toLowerCase() )
					const val = config[key]
					props.push(`\t${ name }: ${ val };\n`)

				} else {

					make_class( prefix + '_' + key.toLowerCase() , config[key] )

				}

			}
			
			rules.push( `[${ prefix }] {\n${ props.join('') }}\n` )

		}

		make_class( Component.name.replace( '$' , '' ) , styles )

		const el = document.createElement('style');
		el.innerHTML = rules.reverse().join('')
		document.head.appendChild( el )

		return el

	}

}
