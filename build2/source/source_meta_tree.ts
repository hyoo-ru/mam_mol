namespace $ {

	export class $mol_build2_source_meta_tree extends $mol_build2_source {

		static match( file: $mol_file2 ): boolean {
			return /\.meta\.tree$/.test( file.name() )
		}

		@ $mol_mem
		deps() {
			const deps = super.deps()

			const tree = this.tree()
			const root_dir = this.root().dir()
		
			tree.select( 'require' ).kids.forEach( ( leaf: $mol_tree2 ) => {
				deps.set( root_dir.resolve( leaf.text().replace( /^\//, '' ) ), 0 )
			} )
			
			tree.select( 'include' ).kids.forEach( ( leaf: $mol_tree2 ) => {
				deps.set( this.lookup( leaf.text().replace( /^\//, '' ) ), -9000 )
			} )

			return deps
		}

		@ $mol_mem
		tree() {
			const file = this.file()
			return this.$.$mol_tree2_from_string( file.text(), file.path() )
		}

	}

}
