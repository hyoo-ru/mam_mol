declare namespace $ {

	type $mol_check_icon__Icon__JG3VLCII = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Base_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__LNTGVC69 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['base_checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__U3IYZ69U = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Checked_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__D8HYIXQO = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['checked_checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_box__Icon__UDUJZ03K = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Disabled_icon'] >
		,
		ReturnType< $mol_check_box['Icon'] >
	>
	type $mol_check_box__checked__DTK3VGFM = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled__EEDSWOJ5 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	export class $mol_check_icon_demo extends $mol_example_small {
		Base_icon( ): $mol_icon_microphone
		base_checked( next?: boolean ): boolean
		Base( ): $mol_check_icon
		Checked_icon( ): $mol_icon_microphone
		checked_checked( next?: boolean ): boolean
		Checked( ): $mol_check_icon
		Disabled_icon( ): $mol_icon_microphone
		Disabled( ): $mol_check_box
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map