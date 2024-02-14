declare namespace $ {

	type $mol_check_expand__checked__CA0UCW96 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['base_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__title__4ZZ4CYTP = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['c1Label'] >
		,
		ReturnType< $mol_check_expand['title'] >
	>
	type $mol_check_expand__title__D9KJWU7V = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['c2Label'] >
		,
		ReturnType< $mol_check_expand['title'] >
	>
	type $mol_check_expand__checked__EQP35FVJ = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['expanded_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__title__UBM3THM5 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['c5Label'] >
		,
		ReturnType< $mol_check_expand['title'] >
	>
	type $mol_check_expand__disabled__7TS7744C = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_expand['disabled'] >
	>
	type $mol_check_expand__checked__19FN70OS = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['base_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__checked__K8B4Q7PS = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['expanded_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_list__rows__QMNXCPGW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_check_expand_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		base_expanded( next?: boolean ): boolean
		c1Label( ): string
		Labeled_base( ): $mol_check_expand
		c2Label( ): string
		expanded_expanded( next?: boolean ): boolean
		Labeled_expanded( ): $mol_check_expand
		c5Label( ): string
		Disabled( ): $mol_check_expand
		Empty_base( ): $mol_check_expand
		Empty_expanded( ): $mol_check_expand
		Demo_items( ): $mol_list
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map