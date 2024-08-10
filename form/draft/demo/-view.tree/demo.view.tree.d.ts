declare namespace $ {

	export class $mol_form_draft_demo_article extends $mol_object2 {
		title( next?: string ): string
		type( next?: string ): string
		adult( next?: boolean ): boolean
		content( next?: string ): string
		friends( next?: readonly(string)[] ): readonly(string)[]
		hobbies( next?: Record<string, any> ): Record<string, any>
	}
	
	type $mol_form_draft_demo_publish__4VJGGDLU = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['publish'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['submit'] >[0]
	>
	type $mol_form_draft_demo_value_str__ZXCKUD9B = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['value_str'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] >[0]
	>
	type $mol_form_draft_demo_value_str__TH5XCDW5 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['value_str'] >[1]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] >[1]
	>
	type $mol_form_draft_demo_list_string__6YNUTPK7 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['list_string'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] >[0]
	>
	type $mol_form_draft_demo_list_string__2M8GXOVH = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['list_string'] >[1]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] >[1]
	>
	type $mol_form_draft_demo_dictionary_bool__QLYQ09OU = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['dictionary_bool'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] >[0]
	>
	type $mol_form_draft_demo_dictionary_bool__SXHFUDVV = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['dictionary_bool'] >[1]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] >[1]
	>
	type $mol_form_draft_demo_reset__97H5RN7J = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['reset'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['reset'] >[0]
	>
	type $mol_string__hint__EO5S07GU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__8B928LPJ = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name__O31SW2YS = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bids__X0QW3B5U = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__Content__YGBSYOTG = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Title'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_switch__value__DL05393Z = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__AQ6Q9QQB = $mol_type_enforce<
		({ 
			'article': string,
			'news': string,
			'question': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_form_field__name__2ERS327P = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bids__SRBPH7TL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__Content__E0KUWMU3 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Type'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_switch__value__56WNX0DL = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__R8TP7DYV = $mol_type_enforce<
		({ 
			'false': string,
			'true': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_form_field__name__JD7AT0UA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__3NPX03MR = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Adult'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_textarea__hint__OFJYINGK = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__2UOO854X = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_form_field__name__C52Q9UA9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bids__WWW0PUC7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__Content__FEM1UUGP = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Content'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_check_list__dictionary__J7WUEE3X = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['dictionary_bool'] >
		,
		ReturnType< $mol_check_list['dictionary'] >
	>
	type $mol_check_list__options__EPL6FARO = $mol_type_enforce<
		({ 
			'programming': string,
			'bikinkg': string,
			'fishing': string,
		}) 
		,
		ReturnType< $mol_check_list['options'] >
	>
	type $mol_form_field__name__OK2VY2P3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__AHLYO8KE = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Hobbies'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_select_list__dictionary__LFWILYKH = $mol_type_enforce<
		({ 
			'jocker': string,
			'harley': string,
			'penguin': string,
			'riddler': string,
			'bane': string,
			'freeze': string,
			'clay': string,
			'mask': string,
		}) 
		,
		ReturnType< $mol_select_list['dictionary'] >
	>
	type $mol_select_list__value__I9N85VWY = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['list_string'] >
		,
		ReturnType< $mol_select_list['value'] >
	>
	type $mol_form_field__name__0ZU2LSLH = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__QZYG6JDL = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Friends'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_form_group__sub__M1ZO86OZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_group['sub'] >
	>
	type $mol_button_major__title__BXQ3U29P = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__TA9TVOFP = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['publish'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__enabled__FJZNQJ93 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['publish_allowed'] >
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_status__message__JUJKIC0W = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['result'] >
		,
		ReturnType< $mol_status['message'] >
	>
	type $mol_button_minor__title__110ZPB5T = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__PP81H0LN = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled__IFKNEJE1 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['changed'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_form_draft__model__BL7VJHVN = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['model'] >
		,
		ReturnType< $mol_form_draft['model'] >
	>
	type $mol_form_draft__form_fields__7EK80QI8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_draft['form_fields'] >
	>
	type $mol_form_draft__body__2MMWMG4M = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['form_body'] >
		,
		ReturnType< $mol_form_draft['body'] >
	>
	type $mol_form_draft__buttons__WYJDYG1G = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_draft['buttons'] >
	>
	export class $mol_form_draft_demo extends $mol_example {
		model( ): $mol_form_draft_demo_article
		publish( next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['submit'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['submit'] >
		publish_allowed( ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['submit_allowed'] >
		value_str( id: any, next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] >
		list_string( id: any, next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] >
		dictionary_bool( id: any, next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] >
		changed( ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['changed'] >
		reset( next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['reset'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['reset'] >
		Title( ): $mol_string
		Title_field( ): $mol_form_field
		Type( ): $mol_switch
		Type_field( ): $mol_form_field
		Adult( ): $mol_switch
		Adult_field( ): $mol_form_field
		Content( ): $mol_textarea
		Content_field( ): $mol_form_field
		Hobbies( ): $mol_check_list
		Hobbies_field( ): $mol_form_field
		Friends( ): $mol_select_list
		Friends_field( ): $mol_form_field
		Config( ): $mol_form_group
		form_body( ): readonly(any)[]
		Publish( ): $mol_button_major
		result( next?: string ): string
		Result( ): $mol_status
		Reset( ): $mol_button_minor
		Form( ): $mol_form_draft
		title( ): string
		message_done( ): string
		bid_required( id: any): string
		bid_swearing( id: any): string
		bid_short( id: any): string
		bid_long( id: any): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map