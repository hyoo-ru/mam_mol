declare namespace $ {

	type $mol_number__value__9M16THFX = $mol_type_enforce<
		ReturnType< $mol_list_demo['items_count'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min__D5SV9HVZ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max__36AVHNSJ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title__DUPL7MZK = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6UFH9MKC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_link__title__DDOG3E27 = $mol_type_enforce<
		ReturnType< $mol_list_demo['item_title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_paragraph__title__BEOTD58B = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_list__rows__4NLSTWJ0 = $mol_type_enforce<
		ReturnType< $mol_list_demo['list_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__Empty__6D283KA5 = $mol_type_enforce<
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