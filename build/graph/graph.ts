namespace $ {
	export class $mol_build_graph extends $mol_object {

		root() { return $mol_file.absolute('') }

		mod_ensure(path: string) {
			return false
		}

		dependencies(rec: { path: string, exclude: string[] | undefined }) {
			return {} as Record<string, number>
		}

		path() { return '' }

		exclude() { return [] as string[] }

		protected graph = new $mol_graph< string , { priority : number } >()

		@ $mol_action
		protected add_node(path: string) {
			const mod = this.$.$mol_file.absolute( path )
			const relative = mod.relate( this.root() )
			this.graph.nodes.add(relative)
		}

		protected added = new $mol_wire_set<string>()

		@ $mol_mem_key
		protected add_module( path : string ) {
			const added = this.added

			if( added.has(path) ) return null
			added.add(path)

			this.add_node(path)

			const deps = this.deps( path )
			for( let dep_path in deps ) {
				this.check_dep( [ path, dep_path ] )
			}

			return null
		}

		@ $mol_mem_key
		protected deps(path: string) { return this.dependencies( { path , exclude: this.exclude() } ) }

		@ $mol_mem_key
		protected check_dep([ path, dep_path ]: [string, string]) {
			const deps = this.deps( path )
			const mod = this.$.$mol_file.absolute( path )
			const graph = this.graph
			const isFile = /\.\w+$/.test( dep_path )

			let dep = ( dep_path[ 0 ] === '/' )
				? this.root().resolve( dep_path + ( isFile ? '' : '/' + dep_path.replace( /.*\// , '' ) ) )
				: ( dep_path[ 0 ] === '.' )
					? mod.resolve( dep_path )
					: this.root().resolve( 'node_modules' ).resolve( './' + dep_path )

			try {
				this.mod_ensure( dep.path() )
			} catch( error: any ) {
				error.message = `${ error.message }\nDependency "${dep_path}" -> "${ dep.relate( this.root() ) }" from "${ mod.relate( this.root() ) }" `
				$mol_fail_hidden(error)
			}
			
			while( !dep.exists() ) dep = dep.parent()
			
			if( dep.type() === 'dir' && dep.name() !== 'index' ) {
				let index = dep.resolve( 'index.js' )
				if( index.exists() ) dep = index
			}
			
			//if( dep.type() === 'file' ) dep = dep.parent()
			if( mod === dep ) return null
			
			const from = mod.relate( this.root() )
			const to = dep.relate( this.root() )
			const edge = graph.edges_out.get( from )?.get( to )
			if( !edge || ( deps[ dep_path ] > edge.priority ) ) {
				graph.link( from , to , { priority : deps[ dep_path ] } )
			}
			
			this.add_module( dep.path() )

			return null
		}

		@ $mol_action
		protected graph_clear() {
			this.graph = new $mol_graph
			this.added.clear()
		}

		@ $mol_mem
		result() {
			this.graph_clear()
			const path = this.path()
			this.mod_ensure( path )
			this.add_module( path )

			this.graph.acyclic( edge => edge.priority )
			return this.graph
		}

		get sorted() { return this.result().sorted }
		get nodes() { return this.result().nodes }
		get edges_out() { return this.result().edges_out }
		get edges_in() { return this.result().edges_in }
	}
}
