declare namespace $ {

	type $mol_button_major__title__HGTBNOS9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__IYJ610PS = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title__RCP2LP9F = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__enabled__OCQMJCQI = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_minor__title__FWQ9SRU3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__FL0RLM8Z = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__XI3MKWI0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__enabled__SNGTZFNF = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__UWMUYVLT = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__HKRTFCW2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__68Q675J4 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__GO0BVOQX = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_button_demo extends $mol_example_small {
		fail( next?: any ): any
		Major_enabled( ): $mol_button_major
		Major_disabled( ): $mol_button_major
		Minor_enabled( ): $mol_button_minor
		Minor_disabled( ): $mol_button_minor
		Minor_icon_only_icon( ): $mol_icon_cursor_default_click_outline
		Minor_icon_only( ): $mol_button_minor
		Minor_iconed_icon( ): $mol_icon_cursor_default_click_outline
		Minor_iconed( ): $mol_button_minor
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map