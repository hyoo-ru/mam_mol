namespace $ {

	export class $mol_build2_bundle_files extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {

			const output = slice.pack().output()

			const root_dir = this.root().dir()
			
			const targets: $mol_file2[] = []

			const files = [ ...slice.files() ].filter( file => /meta.tree$/.test( file.name() ) )
			files.forEach( source => {
				const tree = this.$.$mol_tree2_from_string( source.text(), source.path() )

				const pushFile = (file:$mol_file2) => {
					const start = Date.now()
					const target = output.resolve( file.relate( root_dir ) )
					target.buffer( file.buffer() )
					targets.push( target )
					this.log( target, Date.now() - start )
				}

				const addFilesRecursive = (file:$mol_file2) =>{
					
					if ( ! file.exists() ) return
					if( file.type() === 'dir') {
						file.sub().forEach(sub => {
							addFilesRecursive(sub)
						})
					}
					else {
						pushFile(file)
					}
					
				}

				tree.select( 'deploy' ).kids.forEach( ( deploy: $mol_tree2 ) => {
					const mod = root_dir.resolve( deploy.text().replace( /^\//, '' ) )
					this.root().ensure().ensure( mod.parent().path() )
					addFilesRecursive( mod )
				} )
				
			} )
			
			return targets
		}

	}

}
