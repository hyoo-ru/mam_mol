declare namespace $ {

	type $mol_string__value__27IZ4ITX = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['login'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name__2EVL4P4A = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__C6QBK8L6 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['loginControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_string__value__VFX5A28M = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['password'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__type__1MRZTHFF = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_form_field__name__6ET7S1CL = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passwordLabel'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__DER2QWG1 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['passControl'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_button_major__sub__1QC0TB8Z = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_button_major__click__YHSDVY1Z = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['event_submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__disabled__CE61PA9M = $mol_type_enforce<
		ReturnType< $mol_app_supplies_enter['submit_blocked'] >
		,
		ReturnType< $mol_button_major['disabled'] >
	>
	type $mol_form__form_fields__DJHJ4TFO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['form_fields'] >
	>
	type $mol_form__buttons__AKVS8JQS = $mol_type_enforce<
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