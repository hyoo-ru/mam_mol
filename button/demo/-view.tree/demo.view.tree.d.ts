declare namespace $ {

	type $mol_button_major__title__MSK2MMBO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__APSCKMOC = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title__JDWLTVHY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__enabled__8ECR5PHE = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_minor__title__HDAMKI0L = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__9GI74NJ7 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__Z987THAX = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__enabled__M5IRL62F = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__T4NSZM38 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__A55JZ6E9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__KCSMKDMQ = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__5ZEK1V48 = $mol_type_enforce<
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