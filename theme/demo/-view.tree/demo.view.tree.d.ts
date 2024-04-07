declare namespace $ {

	type $mol_number__value__6QEIIIJK = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__KZ57TRQR = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__D1U45IFL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__5DOZIJW5 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_number__value__MWIBRZFR = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue_spread'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__IO4D9BU3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__LEN80SYV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__XRLFUSW8 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue_spread'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_row__sub__72HCNJSJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_theme_demo_case__theme__Y62HGQEQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__HKOJCT25 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__J3TELXE2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__59Q3I01E = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__title__8NMS8W4S = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['title'] >
	>
	type $mol_theme_demo_case__inner__02BVMHVZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_theme_demo_case['inner'] >
	>
	type $mol_scroll__sub__8NUH8H1R = $mol_type_enforce<
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
	
	type $mol_button_copy__title__8P05XEIK = $mol_type_enforce<
		ReturnType< $mol_theme_demo_case['title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_row__sub__3HACCSR2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_copy__title__HSFH7FK6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__9EYLHX10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__title__WWSYTVWH = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__CEVGSODD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__MAVD7QF9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__K7YOJI8N = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__2TX0Z9XB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__4VXHI8SX = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__P2FQ7YRC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__PL2RSKL4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__VTEE8R5J = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__P52BC5CO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__XWR8XVXK = $mol_type_enforce<
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