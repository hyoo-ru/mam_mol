declare namespace $ {

	type $mol_number__value__HDDB341Z = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__NNW7W8WK = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__5IZMGJTO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__BY07Q20E = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_number__value__YRANCW7F = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue_spread'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__D526HGKO = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__CE7QMUEW = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__ULZ1CWAV = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue_spread'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_row__sub__8FNELL8C = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_theme_demo_case__theme__BB83LALR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__53WEH2PQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__0P52MY09 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__KGZFEQ4T = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__title__BFHP1ILY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['title'] >
	>
	type $mol_theme_demo_case__inner__6EGQ28DT = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_theme_demo_case['inner'] >
	>
	type $mol_scroll__sub__VU8CEIXO = $mol_type_enforce<
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
	
	type $mol_button_copy__title__T6Z7UFB4 = $mol_type_enforce<
		ReturnType< $mol_theme_demo_case['title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_row__sub__HQ6JBALO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_copy__title__SU77GPCD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__G5VYB9SK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__title__5A2QK609 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__QLOM98QJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__19979ID4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__QB2EKDJ2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__OZ62XXRB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__VNV5K2T4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__2HF7D17V = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__WQGT7U1Z = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__AQJSDEDX = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__1A7CVGNA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__1V1XVCWO = $mol_type_enforce<
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