declare namespace $ {

	type $mol_string__value__PMPX239R = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['login'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name__UQ8GRIWW = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__GJN738TU = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_string__value__KHWZVS24 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['password'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__type__WNS0VM81 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_form_field__name__ZNE49V0B = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passwordLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__VP6CHBAJ = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_button_major__sub__0O1KRITI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_button_major__click__X7I8PP7L = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['event_submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__disabled__SLONCIAS = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['submit_blocked'] >
		,
		ReturnType< $mol_button_major['disabled'] >
	>
	type $mol_form__form_fields__AMZJIAY3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['form_fields'] >
	>
	type $mol_form__buttons__01WFOG9S = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['buttons'] >
	>
	export class $mol_app_supplies_enter extends $mol_view {
		loginLabel( ): string
		login( next?: string ): string
		loginControl( ): $mol_string
		loginField( ): $mol_form_field
		passwordLabel( ): string
		password( next?: string ): string
		passControl( ): $mol_string
		passwordField( ): $mol_form_field
		submitLabel( ): string
		event_submit( next?: any ): any
		submit_blocked( ): boolean
		submit( ): $mol_button_major
		form( ): $mol_form
		entered( next?: boolean ): boolean
		minimal_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=enter.view.tree.d.ts.map