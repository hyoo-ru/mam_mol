declare namespace $ {

	type $mol_button_major__title__G043Y3DW = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__AWRE3HOI = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title__IT004VLZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__enabled__P800597N = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_minor__title__L8DLFR51 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__Y4H2NW7Q = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__FYNGLNW5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__enabled__ZI3E4JH0 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__8496C684 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__0SLEY4XN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__W9UU36ZR = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__DROFND88 = $mol_type_enforce<
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