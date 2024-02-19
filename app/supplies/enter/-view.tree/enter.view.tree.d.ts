declare namespace $ {

	type $mol_string__value__NIQTTFF2 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['login'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name__JCOEJFFQ = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__720QXJVM = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_string__value__2XQ3OF2I = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['password'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__type__AO7LAP7Z = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_form_field__name__XMHN58BP = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passwordLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__CY49BZDB = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_button_major__sub__8YI3X6MR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_button_major__click__NCBSVWAZ = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['event_submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__disabled__TD3XNXQC = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['submit_blocked'] >
		,
		ReturnType< $mol_button_major['disabled'] >
	>
	type $mol_form__form_fields__6391CXNP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['form_fields'] >
	>
	type $mol_form__buttons__FFNL4U56 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['buttons'] >
	>
	export class $mol_app_supplies_enter extends $mol_view {
		entered( next?: boolean ): boolean
		minimal_width( ): number
		sub( ): readonly(any)[]
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
	}
	
}

//# sourceMappingURL=enter.view.tree.d.ts.map