declare namespace $ {

	type $mol_nav__keys_x__N3155OJP = $mol_type_enforce<
		ReturnType< $mol_nav_demo['tab_list'] >
		,
		ReturnType< $mol_nav['keys_x'] >
	>
	type $mol_nav__current_x__5MHS9RYZ = $mol_type_enforce<
		ReturnType< $mol_nav_demo['tab_current'] >
		,
		ReturnType< $mol_nav['current_x'] >
	>
	type $mol_nav__keys_y__ECB7ABBD = $mol_type_enforce<
		ReturnType< $mol_nav_demo['row_list'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y__L6G59BAL = $mol_type_enforce<
		ReturnType< $mol_nav_demo['row_current'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_switch__value__FP4K6MQ7 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['tab_current'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__TQ22KEBI = $mol_type_enforce<
		({ 
			'first': string,
			'second': string,
			'third': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_switch__value__N3RN1D31 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['row_current'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__JUYKO8NQ = $mol_type_enforce<
		({ 
			'first': string,
			'second': string,
			'third': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_card__content__1A9M96VA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__status__N1ONLSBD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['status'] >
	>
	export class $mol_nav_demo extends $mol_example {
		Nav( ): $mol_nav
		tab_list( ): ReturnType< ReturnType< $mol_nav_demo['Tab_list'] >['keys'] >
		tab_current( next?: string ): string
		Tab_list( ): $mol_switch
		row_list( ): ReturnType< ReturnType< $mol_nav_demo['Row_list'] >['keys'] >
		row_current( next?: string ): string
		Row_list( ): $mol_switch
		Demo_items( ): $mol_card
		title( ): string
		plugins( ): readonly(any)[]
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map