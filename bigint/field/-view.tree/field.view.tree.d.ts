declare namespace $ {

	type $mol_hotkey__key_mol_bigint_field_1 = $mol_type_enforce<
		({ 
			down( next?: ReturnType< $mol_bigint_field['decrement'] > ): ReturnType< $mol_bigint_field['decrement'] >,
			up( next?: ReturnType< $mol_bigint_field['increment'] > ): ReturnType< $mol_bigint_field['increment'] >,
			pageDown( next?: ReturnType< $mol_bigint_field['decrement_boost'] > ): ReturnType< $mol_bigint_field['decrement_boost'] >,
			pageUp( next?: ReturnType< $mol_bigint_field['increment_boost'] > ): ReturnType< $mol_bigint_field['increment_boost'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_button_minor__click_mol_bigint_field_2 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['decrement'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled_mol_bigint_field_3 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['decrement_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_bigint_field_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_string__type_mol_bigint_field_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__keyboard_mol_bigint_field_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__value_mol_bigint_field_7 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['value_string'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_bigint_field_8 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__enabled_mol_bigint_field_9 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['string_enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__submit_mol_bigint_field_10 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__selection_mol_bigint_field_11 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['selection'] >
		,
		ReturnType< $mol_string['selection'] >
	>
	type $mol_button_minor__click_mol_bigint_field_12 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['increment'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled_mol_bigint_field_13 = $mol_type_enforce<
		ReturnType< $mol_bigint_field['increment_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_bigint_field_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_bigint_field extends $mol_bar {
		decrement( next?: any ): any
		increment( next?: any ): any
		decrement_boost( next?: any ): any
		increment_boost( next?: any ): any
		Hotkey( ): $mol_hotkey
		decrement_enabled( ): ReturnType< $mol_bigint_field['enabled'] >
		Decrement_icon( ): $mol_icon_chevron_left
		Decrement( ): $mol_button_minor
		value_string( next?: string ): string
		hint( ): string
		string_enabled( ): ReturnType< $mol_bigint_field['enabled'] >
		submit( next?: any ): any
		selection( next?: readonly(number)[] ): readonly(number)[]
		String( ): $mol_string
		increment_enabled( ): ReturnType< $mol_bigint_field['enabled'] >
		Increment_icon( ): $mol_icon_chevron_right
		Increment( ): $mol_button_minor
		step( ): bigint
		boost( ): bigint
		value_min( ): bigint | null
		value_max( ): bigint | null
		value( next?: bigint ): bigint
		enabled( next?: boolean ): boolean
		plugins( ): readonly(any)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map