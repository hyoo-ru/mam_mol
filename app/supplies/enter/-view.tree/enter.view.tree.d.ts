declare namespace $ {

	type $mol_string__value__K7SMOSR1 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['login'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name__0KIS4UOP = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__M7YVYD4K = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_string__value__1U2TI8H9 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['password'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__type__B343KHYB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_form_field__name__4WH3MU3T = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passwordLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__X5FERUPQ = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_button_major__sub__ESBITZ12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_button_major__click__RGLQX73R = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['event_submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__disabled__AH9Q8Q29 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['submit_blocked'] >
		,
		ReturnType< $mol_button_major['disabled'] >
	>
	type $mol_form__form_fields__3MK25GMD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['form_fields'] >
	>
	type $mol_form__buttons__4XAEU406 = $mol_type_enforce<
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