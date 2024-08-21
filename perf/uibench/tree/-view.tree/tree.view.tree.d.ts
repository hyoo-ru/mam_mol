declare namespace $ {

	type $mol_perf_uibench_tree_branch__state__RITSMMWG = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree['root_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_branch['state'] >
	>
	export class $mol_perf_uibench_tree extends $mol_view {
		root_state( ): any
		Root( ): $mol_perf_uibench_tree_branch
		state( ): any
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		sub( ): readonly(any)[]
	}
	
	type $mol_perf_uibench_tree_branch__state__O0PN73VY = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree_branch['branch_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_branch['state'] >
	>
	type $mol_perf_uibench_tree_leaf__text__6E7S601C = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree_branch['leaf_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_leaf['text'] >
	>
	export class $mol_perf_uibench_tree_branch extends $mol_list {
		branch_state( id: any): any
		leaf_state( id: any): any
		state( ): any
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_list['attr_static'] >
		Branch( id: any): $mol_perf_uibench_tree_branch
		Leaf( id: any): $mol_perf_uibench_tree_leaf
	}
	
	export class $mol_perf_uibench_tree_leaf extends $mol_view {
		text( ): string
		minimal_height( ): number
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map