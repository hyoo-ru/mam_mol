declare namespace $ {

	type $mol_speck__value__PMNYVJQU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_link__sub__22QOM2RH = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_speck__value__VOXF744T = $mol_type_enforce<
		ReturnType< $mol_speck_demo['string_speck'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_view__sub__MUK00HQP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_speck__value__IN0UFTCY = $mol_type_enforce<
		ReturnType< $mol_speck_demo['notification_count'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_button_minor__sub__5K0KEA79 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_paragraph__sub__239DQVAK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_speck_demo extends $mol_example_small {
		Link_speck( ): $mol_speck
		Link_icon( ): $mol_icon_settings
		Link( ): $mol_link
		string_speck( ): string
		String_speck( ): $mol_speck
		String_field( ): $mol_string
		String( ): $mol_view
		notification_count( ): number
		Button_speck( ): $mol_speck
		Button_icon( ): $mol_icon_menu
		Button( ): $mol_button_minor
		Message_speck( ): $mol_speck
		message_text( ): string
		Message( ): $mol_paragraph
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map