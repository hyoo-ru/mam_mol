declare namespace $ {

	type $mol_number__value__KPFNZ2HB = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__PQUKSUSK = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__ARJJD3OQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__C0AQ1E9H = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_number__value__T423JLNA = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue_spread'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__6V97JYA7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__KK2B23Z6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__GMZZQOJM = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue_spread'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_row__sub__QXVL63AK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_theme_demo_case__theme__IPSURW8I = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__9N1SZOZB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__NVBKRXVU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__UREJYU55 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__title__BF1XVJ5Z = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['title'] >
	>
	type $mol_theme_demo_case__inner__QH0J3BI1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_theme_demo_case['inner'] >
	>
	type $mol_scroll__sub__V2T5U2QT = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_theme_demo extends $mol_example_large {
		hue_deg( ): string
		hue_spread_deg( ): string
		hue( next?: number ): number
		Hue( ): $mol_number
		Hue_field( ): $mol_form_field
		hue_spread( next?: number ): number
		Hue_spread( ): $mol_number
		Hue_spread_field( ): $mol_form_field
		Config( ): $mol_row
		Base( ): $mol_theme_demo_case
		Accent( ): $mol_theme_demo_case
		Current( ): $mol_theme_demo_case
		Special( ): $mol_theme_demo_case
		Cases( ): $mol_theme_demo_case
		Scroll( ): $mol_scroll
		style( ): ({ 
			'--mol_theme_hue': ReturnType< $mol_theme_demo['hue_deg'] >,
			'--mol_theme_hue_spread': ReturnType< $mol_theme_demo['hue_spread_deg'] >,
		}) 
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	type $mol_button_copy__title__IQR1OKGO = $mol_type_enforce<
		ReturnType< $mol_theme_demo_case['title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_row__sub__2DPPQXUW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_copy__title__XGZMNWW0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__JJRJT0BX = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__title__4T6U0FP0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__DSIFXAKC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__AJFLFQ1B = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__JOF3FZGU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__G9HZS4NA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__ERPDIS1P = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__T3E4KHIC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__73183V20 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__R4OLHQPN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__2OPLXWU3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__26AOMCO9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_theme_demo_case extends $mol_view {
		theme( ): string
		Card2_text( ): $mol_button_copy
		Card2( ): $mol_row
		Card1_text( ): $mol_button_copy
		Card1( ): $mol_list
		Back( ): $mol_button_copy
		Line( ): $mol_button_copy
		Text( ): $mol_button_copy
		Field( ): $mol_button_copy
		Shade( ): $mol_button_copy
		Focus( ): $mol_button_copy
		Control( ): $mol_button_copy
		Hover( ): $mol_button_copy
		Current( ): $mol_button_copy
		Special( ): $mol_button_copy
		Self( ): $mol_list
		title( ): ReturnType< $mol_theme_demo_case['theme'] >
		sub( ): readonly(any)[]
		inner( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map