declare namespace $ {

	type $mol_string__value__5SQE8PML = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['login'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name__KHBVEVL9 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__4CIAAVLC = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_string__value__Z180UVQR = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['password'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__type__USJ6MDV8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_form_field__name__UDV4J2G8 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passwordLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__43TIWBIG = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_button_major__sub__XK108QVE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_button_major__click__H82GOGDV = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['event_submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__disabled__8FZVAIJE = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['submit_blocked'] >
		,
		ReturnType< $mol_button_major['disabled'] >
	>
	type $mol_form__form_fields__1WG3B63B = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['form_fields'] >
	>
	type $mol_form__buttons__SMVYH1D4 = $mol_type_enforce<
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