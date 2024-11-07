declare namespace $ {

	type $mol_number__value__XAQZ7IHL = $mol_type_enforce<
		ReturnType< $mol_list_demo['items_count'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min__JFV6CJBL = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max__12KSV6VC = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title__TNYUJXJE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__7T7GFBP8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_link__title__W2AG9D35 = $mol_type_enforce<
		ReturnType< $mol_list_demo['item_title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_paragraph__title__7Q1BZS0O = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_list__rows__9VV33B3N = $mol_type_enforce<
		ReturnType< $mol_list_demo['list_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__Empty__1BENZPP2 = $mol_type_enforce<
		ReturnType< $mol_list_demo['List_empty'] >
		,
		ReturnType< $mol_list['Empty'] >
	>
	export class $mol_list_demo extends $mol_example_small {
		items_count( next?: number ): number
		Items_count( ): $mol_number
		Items_count_label( ): $mol_labeler
		item_title( id: any): string
		Item( id: any): $mol_link
		list_items( ): readonly(any)[]
		List_empty( ): $mol_paragraph
		Items( ): $mol_list
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map