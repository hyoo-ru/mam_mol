namespace $ {

	export class $mol_build2_source_view_ts extends $mol_build2_source {

		static match( file: $mol_file2 ): boolean {
			return /\.view(?:\.css)?\.tsx?$/.test( file.name() )
		}
		
		@ $mol_mem
		deps() {
			const deps = super.deps()
			
			const file = this.file()
			
			const tree = this.$.$mol_file2.absolute( file.path().replace( /(?:\.css)?\.tsx?$/ , '\.tree' ) )
			deps.set( tree, 0 )

			return deps
		}

	}

}
