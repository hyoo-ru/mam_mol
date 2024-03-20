declare namespace $ {

	type $mol_perf_uibench_table__state__P6S144G1 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['table_state'] >
		,
		ReturnType< $mol_perf_uibench_table['state'] >
	>
	type $mol_perf_uibench_anim__state__57R06DI7 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['anim_state'] >
		,
		ReturnType< $mol_perf_uibench_anim['state'] >
	>
	type $mol_perf_uibench_tree__state__FL3ACVDY = $mol_type_enforce<
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