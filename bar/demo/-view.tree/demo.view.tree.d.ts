declare namespace $ {

	type $mol_email__value_mol_bar_demo_1 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_email['value'] >
	>
	type $mol_button_minor__title_mol_bar_demo_2 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['submit_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_bar__sub_mol_bar_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_email__value_mol_bar_demo_4 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_email['value'] >
	>
	type $mol_check_box__title_mol_bar_demo_5 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirm_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_bar_demo_6 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirmed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_bar__sub_mol_bar_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	export class $mol_bar_demo extends $mol_example_small {
		mail( next?: string ): string
		Two_mail( ): $mol_email
		submit_title( ): string
		Two_submit( ): $mol_button_minor
		Two( ): $mol_bar
		Three_mail( ): $mol_email
		confirm_title( ): string
		confirmed( next?: boolean ): boolean
		Three_confirm( ): $mol_check_box
		Three( ): $mol_bar
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map