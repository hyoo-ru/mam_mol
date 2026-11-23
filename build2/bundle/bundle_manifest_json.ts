namespace $ {

	export class $mol_build2_bundle_manifest_json extends $mol_build2_bundle {

		@ $mol_mem_key
		pack_artifacts( pack: $mol_build2_package ) {
			const start = Date.now()

			const output = pack.output()
			const target = output.resolve( 'manifest.json' )
			const name = pack.dir().relate( this.root().dir() ).replace( /\//g, '_' )

			const json = {
				name,
				short_name: name,
				description: '',
				... target.exists() ? {} : {
					id : name ,
					start_url : '.' ,
					display : 'standalone' as string ,
					background_color : '#000000' ,
					theme_color : '#000000' ,
				} ,
			}

			const source = pack.dir().resolve( 'manifest.json' )
			if( source.exists() ) Object.assign( json, JSON.parse( source.text() ) )

			target.text( JSON.stringify( json, null, '\t' ) )

			this.log( target, Date.now() - start )

			return [ target ]
		}

	}

}
