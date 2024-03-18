declare namespace $ {

	type $mol_check_icon__Icon__RWPF9XR2 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Base_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__JZE0S2C3 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['base_checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__K9EQD81H = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Checked_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__9Z67HCRM = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['checked_checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_box__Icon__JHXMWQMM = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Disabled_icon'] >
		,
		ReturnType< $mol_check_box['Icon'] >
	>
	type $mol_check_box__checked__7ZP94RO2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled__J34N1D0W = $mol_type_enforce<
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