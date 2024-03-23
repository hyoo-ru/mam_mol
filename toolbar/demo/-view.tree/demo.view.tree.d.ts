declare namespace $ {

	type $mol_string__hint__T0FYUH9K = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['search_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__hint__VUGRZ6W5 = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['replace_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_button_major__title__6YD6E1HX = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['approve_label'] >
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_minor__title__GBVZV44V = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['decline_label'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__sub__QJK2K6HJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__sub__RP4S5A9P = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__sub__HT9V692D = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__sub__2GC6NS4F = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_toolbar__items__YSN9QXL3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_toolbar['items'] >
	>
	export class $mol_toolbar_demo extends $mol_example_small {
		search_hint( ): string
		Search( ): $mol_string
		replace_hint( ): string
		Replace( ): $mol_string
		approve_label( ): string
		Approve( ): $mol_button_major
		decline_label( ): string
		Decline( ): $mol_button_minor
		Copy_icon( ): $mol_icon_content_copy
		Copy( ): $mol_button_minor
		Cut_icon( ): $mol_icon_content_cut
		Cut( ): $mol_button_minor
		Paste_icon( ): $mol_icon_content_paste
		Paste( ): $mol_button_minor
		Delete_icon( ): $mol_icon_delete
		Delete( ): $mol_button_minor
		Toolbar( ): $mol_toolbar
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map