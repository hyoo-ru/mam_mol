declare namespace $ {

	type $mol_perf_uibench_table__state__I3SO85EP = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['table_state'] >
		,
		ReturnType< $mol_perf_uibench_table['state'] >
	>
	type $mol_perf_uibench_anim__state__W42GXJI8 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['anim_state'] >
		,
		ReturnType< $mol_perf_uibench_anim['state'] >
	>
	type $mol_perf_uibench_tree__state__SC21KXQ7 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['tree_state'] >
		,
		ReturnType< $mol_perf_uibench_tree['state'] >
	>
	export class $mol_perf_uibench extends $mol_scroll {
		table_state( ): any
		Table( ): $mol_perf_uibench_table
		anim_state( ): any
		Anim( ): $mol_perf_uibench_anim
		tree_state( ): any
		Tree( ): $mol_perf_uibench_tree
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_scroll['attr_static'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=uibench.view.tree.d.ts.map