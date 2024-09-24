declare namespace $ {

	type $mol_list__rows__MCJYXCFQ = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['root_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_paragraph__sub__K5648BL9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_list__rows__8308SYU8 = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['row_content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_expander__label__GK882RJI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['label'] >
	>
	type $mol_expander__expanded__8I8TXOIB = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['row_expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__expandable__6APB99Z9 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_expander['expandable'] >
	>
	type $mol_expander__Content__TNQZPMPY = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['Row_content'] >
		,
		ReturnType< $mol_expander['Content'] >
	>
	export class $mol_list_demo_tree extends $mol_example_large {
		root_rows( ): readonly(any)[]
		Content( ): $mol_list
		row_title( id: any): string
		Row_title( id: any): $mol_paragraph
		row_expanded( id: any, next?: boolean ): boolean
		row_content( id: any): readonly(any)[]
		Row_content( id: any): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		Row( id: any): $mol_expander
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map