declare namespace $ {

	type $mol_number__value__6RXSZ8NB = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__SJ2CS0FU = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__JCYLGHCS = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__0VDCICPS = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_number__value__Z0RT76QM = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue_spread'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__GN8D0SQ4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name__X43NT23E = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__70T02GAB = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue_spread'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_row__sub__M451E9VZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_theme_demo_case__theme__NWGAR33J = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__QZXC00P4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__XTFM4Y7K = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme__GU4V8YPJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__title__0J66Q6G9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['title'] >
	>
	type $mol_theme_demo_case__inner__9D497UQR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_theme_demo_case['inner'] >
	>
	type $mol_scroll__sub__3D240TBQ = $mol_type_enforce<
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
	
	type $mol_button_copy__title__WTM9YAOP = $mol_type_enforce<
		ReturnType< $mol_theme_demo_case['title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_row__sub__5B127CZT = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_copy__title__XDYUKRYQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__A0P35IOA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__title__R8MXIBX2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__FCNRTN5Q = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__JKAUXFFH = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__DLK1WK8G = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__J4IDHR1H = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__LA5DEGZW = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__DQP1T5VA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__PPMQ9SB1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__P2PST046 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title__47O4PY00 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows__DXSHFXEO = $mol_type_enforce<
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