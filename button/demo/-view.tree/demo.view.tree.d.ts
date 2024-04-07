declare namespace $ {

	type $mol_button_major__title__BFELK4GE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__K95RO9BO = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title__E6NNKKF2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__enabled__S9RUR96W = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_minor__title__3GAS8F3Y = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__FQL0XV90 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__1UMM35T6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__enabled__CC3QLMWB = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__B4HK7YR0 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__I2OZGG12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__8IB2XFMY = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__0WGXLWL8 = $mol_type_enforce<
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