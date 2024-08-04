declare namespace $ {

	type $mol_number__value__VD2O2SCY = $mol_type_enforce<
		ReturnType< $mol_list_demo['items_count'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min__86HCALA7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max__B0AD769X = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title__XL0DKDAV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__M759DROY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_link__title__TNN6BXX7 = $mol_type_enforce<
		ReturnType< $mol_list_demo['item_title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_paragraph__title__PLY3FIF8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_list__rows__O02FSKG2 = $mol_type_enforce<
		ReturnType< $mol_list_demo['list_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__Empty__REU6GOGE = $mol_type_enforce<
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