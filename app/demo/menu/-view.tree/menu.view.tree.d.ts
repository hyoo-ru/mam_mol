declare namespace $ {

	type $mol_search__query_mol_app_demo_menu_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_tag_tree__Item_mol_app_demo_menu_2 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['Option'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__ids_tags_mol_app_demo_menu_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['ids_tags'] >
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	type $mol_tag_tree__levels_expanded_mol_app_demo_menu_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['levels_expanded'] >
		,
		ReturnType< $mol_tag_tree['levels_expanded'] >
	>
	type $mol_dimmer__haystack_mol_app_demo_menu_5 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_app_demo_menu_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_link__arg_mol_app_demo_menu_7 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_app_demo_menu_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_app_demo_menu extends $mol_page {
		filter( next?: string ): string
		Filter( ): $mol_search
		ids_tags( ): Record<string, any>
		levels_expanded_default( ): number
		levels_expanded( ): ReturnType< $mol_app_demo_menu['levels_expanded_default'] >
		Tree( ): $mol_tag_tree
		option_arg( id: any): Record<string, any>
		option_title( id: any): string
		Option_title( id: any): $mol_dimmer
		names( ): readonly(string)[]
		widget_tags( id: any): readonly(string)[]
		widget_aspects( id: any): readonly(string)[]
		widget_title( id: any): string
		search_start( next?: any ): any
		body( ): readonly(any)[]
		Option( id: any): $mol_link
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map