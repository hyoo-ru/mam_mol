namespace $.$$ {

	export class $mol_perf_uibench_tree extends $.$mol_perf_uibench_tree {

		state() {
			return { root : null as any }
		}

		root_state() {
			return this.state().root || { children : [] }
		}
		
	}

	export class $mol_perf_uibench_tree_branch extends $.$mol_perf_uibench_tree_branch {

		state() {
			return { children : [] as any[] }
		}

		@ $mol_mem
		sub() : $mol_view[] {
			return ( this.state().children || [] ).map( ( child : any , index : number )=> {
				return child.container ? this.Branch( index ) : this.Leaf( index )
			} )
		}

		@ $mol_mem_key
		branch_state( index : number ) {
			return this.state().children[ index ]
		}

		@ $mol_mem_key
		leaf_state( index : number ) {
			return this.state().children[ index ].id
		}

	}

}
