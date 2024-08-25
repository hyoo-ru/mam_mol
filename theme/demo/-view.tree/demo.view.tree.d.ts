declare namespace $ {

	type $mol_number__value__5DQI1HPC = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__TEH2CI0R = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__V4ZOF11G = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__ZE7SJVDD = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_number__value__GT510HC9 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue_spread'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__KX87FMPI = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__MQIV418W = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__2WFP3075 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue_spread'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_row__sub__5JMD3TUO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_theme_demo_case__theme__0ZK7F750 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__F2GSEAWZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__2GEXC3JS = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__72463RWN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__title__2Y1W2AAQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['title'] >
	>
	type $mol_theme_demo_case__inner__6NCTA3WY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_theme_demo_case['inner'] >
	>
	type $mol_scroll__sub__ZJBSL24D = $mol_type_enforce<
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
	
	type $mol_button_copy__title__RKJW26Z0 = $mol_type_enforce<
		ReturnType< $mol_theme_demo_case['title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_row__sub__KSVTZZ0N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_copy__title__YYGR2KS9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__EMAOB8VD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__title__H0HBNU4M = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__Q9255E2Z = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__ZLX1GQUK = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__VQJG0H47 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__WWUFBBIB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__3BKISU3W = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__CXN8Z75E = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__RYUVGKWR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__QX2WK5BL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__ZC2DBEQL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__N7CLTWY5 = $mol_type_enforce<
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