declare namespace $ {

	type $mol_search__query__IHZK2EPW = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_tag_tree__Item__M4IKCGFY = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['Option'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__ids_tags__UOGZE3HR = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['ids_tags'] >
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	type $mol_tag_tree__levels_expanded__6KQFQ28E = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['levels_expanded'] >
		,
		ReturnType< $mol_tag_tree['levels_expanded'] >
	>
	type $mol_dimmer__haystack__I1A25T3M = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle__KI2FI4S8 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_link__arg__X82QC3WD = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__G30FYYKY = $mol_type_enforce<
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