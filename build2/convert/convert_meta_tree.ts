namespace $ {

	export class $mol_build2_convert_meta_tree extends $mol_build2_convert {

		static match( file: $mol_file2 ): boolean {
			return /\.meta\.tree$/.test( file.name() )
		}

		@ $mol_mem
		generated_sources() {
			const source = this.source()
			const tree = this.tree()
			
			const content = [] as string[]
			for( const step of tree.select( 'build', null ).kids ) {
				if( step.type ) content.push( step.text() )
			}

			if( !content.length ) return []

			this.$.$mol_log3_warn({
				message: 'Shell command required',
				hint: 'Check command for safety and execute manually',
				place: `${this}.generated_sources()`,
				source: source.relate(),
				script: content,
			})

			return []
		}

		@ $mol_mem
		tree() {
			const source = this.source()
			return this.root().source( [ this.$.$mol_build2_source_meta_tree, source ] )!.tree()
		}

	}

}
