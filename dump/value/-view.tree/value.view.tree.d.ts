declare namespace $ {

	type $mol_text_code__text__TG2NL8AN = $mol_type_enforce<
		ReturnType< $mol_dump_value['simple'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__text__4CFFK9MG = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_title'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_check_expand__minimal_height__U4JTX8NL = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_height'] >
	>
	type $mol_check_expand__minimal_width__6BHMWN42 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_width'] >
	>
	type $mol_check_expand__expanded__O1PEAG3G = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	type $mol_check_expand__expandable__RFVO2CX8 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__clicks__3I90FJO3 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_all'] >
		,
		ReturnType< $mol_check_expand['clicks'] >
	>
	type $mol_check_expand__label__WRUZ9WXC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__dom_node__AVLJCVKC = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_dom'] >
		,
		ReturnType< $mol_view['dom_node'] >
	>
	type $mol_view__render__5O499W7R = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview'] >
		,
		ReturnType< $mol_view['render'] >
	>
	type $mol_view__sub__2FOD90WP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_dump_list__values__6686NFFM = $mol_type_enforce<
		ReturnType< $mol_dump_value['row_values'] >
		,
		ReturnType< $mol_dump_list['values'] >
	>
	type $mol_dump_list__prototypes__T7LHC8XE = $mol_type_enforce<
		ReturnType< $mol_dump_value['prototypes'] >
		,
		ReturnType< $mol_dump_list['prototypes'] >
	>
	type $mol_dump_list__preview_show__AEE1SJ5T = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_show'] >
		,
		ReturnType< $mol_dump_list['preview_show'] >
	>
	type $mol_expander__expanded__M89NLDK7 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__Trigger__RDDRS0MC = $mol_type_enforce<
		ReturnType< $mol_dump_value['Expand_head'] >
		,
		ReturnType< $mol_expander['Trigger'] >
	>
	type $mol_expander__content__G9MDGFG9 = $mol_type_enforce<
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