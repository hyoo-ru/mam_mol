namespace $ {

	export class $mol_build2_bundle_locale extends $mol_build2_bundle {
		
		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {

			const prefix = slice.prefix()
			const output = slice.pack().output()

			const files = [ ...slice.files() ].filter( file => /(locale=(\w+)\.json)$/.test( file.name() ) )

			const locales = {} as { [ key: string ]: { [ key: string ]: string } }
			
			files.forEach(
				file => {
					const [ , lang ] = /locale=(\w+)\.json$/.exec( file.name() )!
					
					if( !locales[ lang ] ) locales[ lang ] = {}
					
					const loc = JSON.parse( file.text() )
					for( let key in loc ) {
						locales[ lang ][ key ] = loc[ key ]
					}
				}
			)

			const targets = Object.keys( locales ).map( lang => {
				const start = Date.now()
				const target = output.resolve( `${prefix}.locale=${ lang }.json` )
				
				const locale = locales[ lang ]

				if( lang !== 'en' && locales['en'] ) {
					
					for( let key in locale ) {
						if( key in locales[ 'en' ] ) continue
						delete locale[ key ]
						this.$.$mol_log3_warn({
							place: `${this}.buildLocale()`,
							message: `Excess locale key`,
							hint: 'May be you forgot to remove this key?',
							lang,
							key,
						})
					}

				}
				
				const locale_sorted = {} as Record<string, string>

				for( let key of Object.keys( locale ).sort() ) {
					locale_sorted[ key ] = locale[ key ]
				}

				target.text( JSON.stringify( locale_sorted, null, '\t' ) )
				
				this.log( target, Date.now() - start )
				
				return target
			} )
			
			return targets
		}

	}

}
