namespace $ {
	export class $mol_build_graph extends $mol_object {

		root() { return $mol_file.absolute('') }

		mod_ensure(path: string) {
			return false
		}

		dependencies(path: string) {
			return {} as Record<string, number>
		}

		path() { return '' }

		protected graph = new $mol_graph< string , { priority : number } >()
		protected added = new Set<string>()

		@ $mol_action
		protected clear() {
			this.graph = new $mol_graph
			this.added.clear()
		}

		@ $mol_action
		protected file(path: string) {
			if (this.added.has(path)) return null
			this.added.add(path)

			const mod = this.$.$mol_file.absolute( path )
			const relative = mod.relate( this.root() )
			this.graph.nodes.add(relative)

			return mod
		}

		@ $mol_action
		protected add_module( path : string ) {
			const mod = this.file(path)
			if (! mod) return null

			const deps = this.dependencies( path )
			for( let dep_path in deps ) {
				this.check_dep( deps, mod, dep_path )
			}

			return null
		}

		@ $mol_action
		protected check_dep(deps: Record<string, number>, mod: $mol_file, dep_path: string) {
			// const deps = this.dependencies( path )
			// const mod = this.$.$mol_file.absolute( path )
			const root = this.root()
			const isFile = /\.\w+$/.test( dep_path )

			let dep = ( dep_path[ 0 ] === '/' )
				? root.resolve( dep_path + ( isFile ? '' : '/' + dep_path.replace( /.*\// , '' ) ) )
				: ( dep_path[ 0 ] === '.' )
					? mod.resolve( dep_path )
					: root.resolve( 'node_modules' ).resolve( './' + dep_path )

			try {
				this.mod_ensure( dep.path() )
			} catch( error ) {
				if (error instanceof Error) {
					error.message = `${ error.message }\nDependency "${dep_path}" -> "${ dep.relate( root ) }" from "${ mod.relate( root ) }" `
				}
				$mol_fail_hidden(error)
			}
			
			while( !dep.exists() ) dep = dep.parent()
			
			if( dep.type() === 'dir' && dep.name() !== 'index' ) {
				let index = dep.resolve( 'index.js' )
				if( index.exists() ) dep = index
			}
			
			//if( dep.type() === 'file' ) dep = dep.parent()
			if( mod === dep ) return null
			
			const from = mod.relate( root )
			const to = dep.relate( root )
			const edge = this.graph.edges_out.get( from )?.get( to )
			if( !edge || ( deps[ dep_path ] > edge.priority ) ) {
				this.graph.link( from , to , { priority : deps[ dep_path ] } )
			}
			
			this.add_module( dep.path() )

			return null
		}

		@ $mol_mem
		protected out() {
			this.clear()
			const path = this.path()
			this.mod_ensure( path )
			this.add_module( path )

			this.graph.acyclic( edge => edge.priority )
			this.added.clear()
			return this.graph
		}

		get sorted() { return this.out().sorted }
		get nodes() { return this.out().nodes }
		get edges_out() { return this.out().edges_out }
		get edges_in() { return this.out().edges_in }
	}
}
