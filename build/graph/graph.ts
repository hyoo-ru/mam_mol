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
		protected path_added(path: string) {
			if (this.added.has(path)) return true
			this.added.add(path)
			return false
		}

		protected add_module( path : string ) {
			if (this.path_added(path)) return null
			const mod = this.$.$mol_file.absolute( path )
			this.graph.nodes.add(mod.relate( this.root() ))

			const deps = this.dependencies( path )
			for( let dep_path in deps ) {
				this.check_dep( [ path, dep_path ])
			}

			return null
		}

		@ $mol_mem_key
		protected check_dep([ path, dep_path ]: [ path: string, dep_path: string ]) {
			const deps = this.dependencies( path )
			const mod = this.$.$mol_file.absolute( path )
			const root = this.root()
			let dep

			const isFile = /\.\w+$/.test( dep_path )

			if (dep_path[0] === '/' && isFile) {

				dep = root.resolve(dep_path)

			} else if (dep_path[0] === '/') {

				const last_segment = dep_path.slice(dep_path.lastIndexOf('/') + 1)
				dep = root.resolve(dep_path + '/' + last_segment)

			} else if (dep_path[0] === '.') {

				dep = mod.resolve( dep_path )

			} else {

				dep = root.resolve( 'node_modules' ).resolve( './' + dep_path )

			}

			try {
				this.mod_ensure( dep.path() )
			} catch( error ) {
				if ($mol_fail_catch(error)) {
					(error as Error).message += `\nDependency "${
						dep_path}" -> "${ dep.relate( root ) }" from "${ mod.relate( root ) }" `
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
