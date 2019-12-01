namespace $ {

	export function $mol_style_sheet<
		Component extends object
	>(
		Component : new()=> Component ,
		config : $mol_style_definition< Component > ,
	) {

		let rules = [] as string[]

		const make_class = ( prefix : string , suffix : string , config : $mol_style_definition<any> )=> {

			const props = [] as string[]
			
			for( let key in config ) {

				if( /^[a-z]/.test(key) ) {

					const name = key.replace( /[A-Z]/ , letter => '-' + letter.toLowerCase() )
					const val = config[key]
					props.push(`\t${ name }: ${ val };\n`)

				} else if( /^[A-Z]/.test(key) ) {

					make_class( prefix + '_' + key.toLowerCase() , suffix , config[key] as any )

				} else if( key[0] === '$' ) {

					make_class( prefix + '] ' + key.replace( '$' , '[' ) , suffix , config[key] as any )

				} else {

					make_class( prefix , suffix + key , config[key] as any )

				}

			}
			
			rules.push( `${ prefix }${ suffix } {\n${ props.join('') }}\n` )

		}

		make_class( Component.name.replace( '$' , '[' ) , ']' , config )

		return rules.reverse().join('')

	}

}
