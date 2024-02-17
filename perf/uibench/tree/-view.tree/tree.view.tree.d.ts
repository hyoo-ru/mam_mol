declare namespace $ {

	type $mol_perf_uibench_tree_branch__state__NIJOA60K = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree['root_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_branch['state'] >
	>
	export class $mol_perf_uibench_tree extends $mol_view {
		state( ): any
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		sub( ): readonly(any)[]
		root_state( ): any
		Root( ): $mol_perf_uibench_tree_branch
	}
	
	type $mol_perf_uibench_tree_branch__state__JHYO7A8A = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree_branch['branch_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_branch['state'] >
	>
	type $mol_perf_uibench_tree_leaf__text__AN4ZBO1L = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree_branch['leaf_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_leaf['text'] >
	>
	export class $mol_perf_uibench_tree_branch extends $mol_list {
		state( ): any
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_list['attr_static'] >
		Branch( id: any): $mol_perf_uibench_tree_branch
		Leaf( id: any): $mol_perf_uibench_tree_leaf
		branch_state( id: any): any
		leaf_state( id: any): any
	}
	
	export class $mol_perf_uibench_tree_leaf extends $mol_view {
		minimal_height( ): number
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		sub( ): readonly(any)[]
		text( ): string
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map