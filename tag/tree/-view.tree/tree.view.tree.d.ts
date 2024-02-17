declare namespace $ {

	type $mol_tag_tree_sub__4BMTSC8S = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_list'] >[number]
		,
		$mol_view
	>
	type $mol_tag_tree_sub__S2LL4QRR = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_list'] >[number]
		,
		$mol_view
	>
	type $mol_view__sub__JB741WJ9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_expander__expandable__92LRM9IV = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_expander['expandable'] >
	>
	type $mol_expander__expanded__LYUGVB3I = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__title__YJ9RR9F0 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content__XL493W5F = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	type $mol_tag_tree__ids_tags__H2AGLOZV = $mol_type_enforce<
		ReturnType< $mol_tag_tree['ids_tags'] >
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	type $mol_tag_tree__path__PCFCCHYH = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_path'] >
		,
		ReturnType< $mol_tag_tree['path'] >
	>
	type $mol_tag_tree__Item__92FF25EC = $mol_type_enforce<
		ReturnType< $mol_tag_tree['Item'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__item_title__XQPO7A63 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_title'] >
		,
		ReturnType< $mol_tag_tree['item_title'] >
	>
	type $mol_tag_tree__tag_expanded__DO7P8SXN = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_tag_tree['tag_expanded'] >
	>
	type $mol_tag_tree__tag_name__K46DCNG6 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_tag_tree['tag_name'] >
	>
	export class $mol_tag_tree extends $mol_list {
		path( ): readonly(string)[]
		ids_tags( ): Record<string, any>
		ids( ): readonly(any)[]
		tags( ): readonly(string)[]
		levels_expanded( ): number
		sub( ): readonly($mol_view)[]
		tag_name( id: any): string
		tag_list( ): readonly($mol_view)[]
		item_list( ): readonly($mol_view)[]
		Item( id: any): $mol_view
		Tag( id: any): $mol_expander
		tag_list( ): readonly($mol_view)[]
		item_list( ): readonly($mol_view)[]
		item_title( id: any): string
		tag_expanded( id: any, next?: boolean ): boolean
		tag_name( id: any): string
		tag_path( id: any): readonly(string)[]
		Tag_tree( id: any): $mol_tag_tree
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map