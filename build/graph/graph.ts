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

		protected added = new Set<string>()

		@ $mol_mem
		graph(reset?: null) {
			this.added.clear()
			return new $mol_graph< string , { priority : number } >()
		}

		@ $mol_action
		path_added(path: string) { return this.added.has(path) }

		protected add_module( path : string ) {
			this.added.add(path)
			const mod = this.$.$mol_file.absolute( path )
			this.graph().nodes.add(mod.relate( this.root() ))

			const deps = this.dependencies( path )
			for( let target in deps ) {
				this.check_dep( [ path, target ])
			}

			return null
		}

		path_resolved(target: string) {
			const isFile = /\.\w+$/.test( target )
			const root = this.root()

			if (target[0] === '/' && isFile) return root.resolve(target)
		
			if (target[0] === '/') {
				const last_segment = target.slice(target.lastIndexOf('/') + 1)
				return root.resolve(target + '/' + last_segment)
			}

			return root.resolve( 'node_modules' ).resolve( './' + target )
		}

		@ $mol_mem_key
		protected check_dep([ path, target ]: [ path: string, target: string ]) {
			const root = this.root()
			const deps = this.dependencies( path )
			const mod = this.$.$mol_file.absolute( path )

			let dep = target[0] === '.' ? mod.resolve( target ) : this.path_resolved( target )

			try {
				this.mod_ensure( dep.path() )
			} catch( error ) {
				if ($mol_fail_catch(error)) {
					(error as Error).message += `\nDependency "${
						target}" -> "${ dep.relate( root ) }" from "${ mod.relate( root ) }" `
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
			const edge = this.graph().edges_out.get( from )?.get( to )
			if( !edge || ( deps[ target ] > edge.priority ) ) {
				this.graph().link( from , to , { priority : deps[ target ] } )
			}
			if (this.path_added(dep.path())) return null
			this.add_module( dep.path() )

			return null
		}

		@ $mol_mem
		protected out() {
			this.graph(null)
			const path = this.path()
			this.mod_ensure( path )
			this.add_module( path )

			this.graph().acyclic( edge => edge.priority )
			this.added.clear()
			return this.graph()
		}

		get sorted() { return this.out().sorted }
		get nodes() { return this.out().nodes }
		get edges_out() { return this.out().edges_out }
		get edges_in() { return this.out().edges_in }
	}
}
