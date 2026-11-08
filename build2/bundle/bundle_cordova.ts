namespace $ {

	export class $mol_build2_bundle_cordova extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const pack = slice.pack()
			const output = pack.output()
			const cordova = pack.dir().resolve( '-cordova' )
			const config = pack.dir().resolve( 'config.xml' )
			if( !config.exists() ) return []

			const targets = [] as $mol_file2[]
			const config_target = cordova.resolve( 'config.xml' )
			config_target.text( config.text() )
			targets.push( config_target )

			for( const source of output.find().filter( file => file.type() === 'file' ) ) {
				const target = cordova.resolve( `www/${ source.relate( output ) }` )
				target.buffer( source.buffer() )
				targets.push( target )
			}

			this.log( cordova, Date.now() - start )

			return targets
		}

	}

}
