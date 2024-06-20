declare namespace $ {

	type $mol_text_code__text__OMU5G65A = $mol_type_enforce<
		ReturnType< $mol_dump_value['simple'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__text__JT5UK7UG = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_title'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_check_expand__minimal_height__8PKYZUSD = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_height'] >
	>
	type $mol_check_expand__minimal_width__K2ADFSKJ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_width'] >
	>
	type $mol_check_expand__expanded__6F6GUGIG = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	type $mol_check_expand__expandable__C3XO0DEC = $mol_type_enforce<
		ReturnType< $mol_dump_value['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__clicks__1A5TD5BQ = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_all'] >
		,
		ReturnType< $mol_check_expand['clicks'] >
	>
	type $mol_check_expand__label__PI63PWIV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__dom_node__JNFDYGNF = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_dom'] >
		,
		ReturnType< $mol_view['dom_node'] >
	>
	type $mol_view__render__PZHRXXNR = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview'] >
		,
		ReturnType< $mol_view['render'] >
	>
	type $mol_view__sub__YM7SDTOJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_dump_list__values__WYVX8G3B = $mol_type_enforce<
		ReturnType< $mol_dump_value['row_values'] >
		,
		ReturnType< $mol_dump_list['values'] >
	>
	type $mol_dump_list__prototypes__KXRQWXSB = $mol_type_enforce<
		ReturnType< $mol_dump_value['prototypes'] >
		,
		ReturnType< $mol_dump_list['prototypes'] >
	>
	type $mol_dump_list__preview_show__7EV0QJF3 = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_show'] >
		,
		ReturnType< $mol_dump_list['preview_show'] >
	>
	type $mol_expander__expanded__B1MO7OIK = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__Trigger__ZPTYN64P = $mol_type_enforce<
		ReturnType< $mol_dump_value['Expand_head'] >
		,
		ReturnType< $mol_expander['Trigger'] >
	>
	type $mol_expander__content__7PRKX8BA = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_content'] >
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_dump_value extends $mol_view {
		simple( ): string
		Simple( ): $mol_text_code
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		expand_all( next?: any ): any
		expand_title( ): string
		Expand_title( ): $mol_text_code
		Expand_head( ): $mol_check_expand
		preview_dom( ): any
		preview( ): any
		Preview_dom( ): $mol_view
		Preview( ): $mol_view
		row_values( id: any): readonly(any)[]
		prototypes( ): boolean
		Row( id: any): $mol_dump_list
		expand_content( ): readonly(any)[]
		Expand( ): $mol_expander
		value( next?: any ): any
		preview_show( next?: boolean ): boolean
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=value.view.tree.d.ts.map