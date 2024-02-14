declare namespace $ {

	type $mol_tag_sieve__ids_tags__PT9XRFHP = $mol_type_enforce<
		ReturnType< $mol_tag_tree['ids_tags'] >
		,
		ReturnType< $mol_tag_sieve['ids_tags'] >
	>
	type $mol_tag_sieve__separator__D9RT9JI4 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['separator'] >
		,
		ReturnType< $mol_tag_sieve['separator'] >
	>
	type $mol_tag_tree_sub__L3J4XFO1 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_list'] >[number]
		,
		$mol_view
	>
	type $mol_tag_tree_sub__G5YQTJRN = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_list'] >[number]
		,
		$mol_view
	>
	type $mol_view__sub__5TA3O70A = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_expander__expandable__ZYO7L5SO = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_expander['expandable'] >
	>
	type $mol_expander__expanded__UYYSDWTS = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__title__WMUOVH4V = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content__CAL80U35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	type $mol_tag_tree__sieve__MA1SSZEL = $mol_type_enforce<
		ReturnType< $mol_tag_tree['sieve_sub'] >
		,
		ReturnType< $mol_tag_tree['sieve'] >
	>
	type $mol_tag_tree__Item__J0RAE38C = $mol_type_enforce<
		ReturnType< $mol_tag_tree['Item'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__item_title__CRZJTVKC = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_title'] >
		,
		ReturnType< $mol_tag_tree['item_title'] >
	>
	type $mol_tag_tree__tag_expanded__E8V3ETSS = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_tag_tree['tag_expanded'] >
	>
	type $mol_tag_tree__tag_name__CEX5RAVP = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_tag_tree['tag_name'] >
	>
	export class $mol_tag_tree extends $mol_list {
		sieve( ): $mol_tag_sieve
		levels_expanded( ): number
		sort_items( ): any
		sort_tags( ): any
		sub( ): readonly($mol_view)[]
		tag_name( id: any): string
		tag_names( ): Record<string, any>
		tag_list( ): readonly($mol_view)[]
		item_list( ): readonly($mol_view)[]
		Item( id: any): $mol_view
		Tag( id: any): $mol_expander
		ids_tags( ): Record<string, any>
		separator( ): string
		tag_list( ): readonly($mol_view)[]
		item_list( ): readonly($mol_view)[]
		item_title( id: any): string
		tag_expanded( id: any, next?: boolean ): boolean
		tag_name( id: any): string
		sieve_sub( id: any): $mol_tag_sieve
		Tag_tree( id: any): $mol_tag_tree
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map