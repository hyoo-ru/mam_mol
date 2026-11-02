namespace $ {

	export class $mol_build2_bundle_readme extends $mol_build2_bundle {

		@ $mol_mem_key
		pack_artifacts( pack: $mol_build2_package ) {
			const start = Date.now()
			
			let dir = pack.dir()
			let source
			
			while( true ) {
				
				source = dir.resolve( 'README.md' )
				if( source.exists() ) break
				
				source = dir.resolve( 'readme.md' )
				if( source.exists() ) break
				
				if( dir === this.root().dir() ) break
				dir = dir.parent()
				
			}

			const target = pack.output().resolve( 'README.md' )
			target.text( source?.text() ?? pack.dir().path() )

			this.log( target, Date.now() - start )
			
			return [ target ]
		}

	}

}
