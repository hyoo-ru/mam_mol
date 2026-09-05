declare namespace $ {

	type $mol_select__Filter_mol_vary_edit_1 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__Trigger_icon_mol_vary_edit_2 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Trigger_icon'] >
	>
	type $mol_select__option_content_mol_vary_edit_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_select['option_content'] >
	>
	type $mol_select__enabled_mol_vary_edit_4 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['type_mutable'] >
		,
		ReturnType< $mol_select['enabled'] >
	>
	type $mol_select__dictionary_mol_vary_edit_5 = $mol_type_enforce<
		({ 
			'Null': string,
			'Bool': string,
			'Bint': string,
			'Real': string,
			'Text': string,
			'List': string,
			'Tupl': string,
		}) 
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_select__value_mol_vary_edit_6 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['type'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_drop__adopt_mol_vary_edit_7 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['item_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive_mol_vary_edit_8 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['type_receive'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub_mol_vary_edit_9 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['Type'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_check_box__checked_mol_vary_edit_10 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['bool'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled_mol_vary_edit_11 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_bigint_field__value_mol_vary_edit_12 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['bint'] >
		,
		ReturnType< $mol_bigint_field['value'] >
	>
	type $mol_bigint_field__enabled_mol_vary_edit_13 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_bigint_field['enabled'] >
	>
	type $mol_bigint_field__selection_mol_vary_edit_14 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['text_selection'] >
		,
		ReturnType< $mol_bigint_field['selection'] >
	>
	type $mol_number__value_mol_vary_edit_15 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['real'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__enabled_mol_vary_edit_16 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_number['enabled'] >
	>
	type $mol_number__selection_mol_vary_edit_17 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['text_selection'] >
		,
		ReturnType< $mol_number['selection'] >
	>
	type $mol_date__value_moment_mol_vary_edit_18 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['date'] >
		,
		ReturnType< $mol_date['value_moment'] >
	>
	type $mol_date__enabled_mol_vary_edit_19 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_date['enabled'] >
	>
	type $mol_textarea__value_mol_vary_edit_20 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__enabled_mol_vary_edit_21 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_textarea__selection_mol_vary_edit_22 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['text_selection'] >
		,
		ReturnType< $mol_textarea['selection'] >
	>
	type $mol_check_expand__expanded_mol_vary_edit_23 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	type $mol_button_minor__click_mol_vary_edit_24 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['item_add'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled_mol_vary_edit_25 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_vary_edit_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_string__hint_mol_vary_edit_27 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__submit_mol_vary_edit_28 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['field_add'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_vary_edit_29 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__sub_mol_vary_edit_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_string['sub'] >
	>
	type $mol_bar__sub_mol_vary_edit_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_view__sub_mol_vary_edit_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_drag__drag_end_mol_vary_edit_33 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['item_drag_end'] >
		,
		ReturnType< $mol_drag['drag_end'] >
	>
	type $mol_drag__transfer_mol_vary_edit_34 = $mol_type_enforce<
		({ 
			'text/plain': ReturnType< $mol_vary_edit['transfer_vary'] >,
			'text/html': string,
			'text/uri-list': ReturnType< $mol_vary_edit['transfer_vary'] >,
		}) 
		,
		ReturnType< $mol_drag['transfer'] >
	>
	type $mol_drag__Sub_mol_vary_edit_35 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['Item_key'] >
		,
		ReturnType< $mol_drag['Sub'] >
	>
	type $mol_drop__adopt_mol_vary_edit_36 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['item_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive_mol_vary_edit_37 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['item_receive'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub_mol_vary_edit_38 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['Item_drag'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_vary_edit__enabled_mol_vary_edit_39 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['enabled'] >
		,
		ReturnType< $mol_vary_edit['enabled'] >
	>
	type $mol_vary_edit__value_mol_vary_edit_40 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['item_val'] >
		,
		ReturnType< $mol_vary_edit['value'] >
	>
	type $mol_vary_edit__selection_mol_vary_edit_41 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['item_selection'] >
		,
		ReturnType< $mol_vary_edit['selection'] >
	>
	type $mol_bar__sub_mol_vary_edit_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_list__rows_mol_vary_edit_43 = $mol_type_enforce<
		ReturnType< $mol_vary_edit['body'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_vary_edit extends $mol_list {
		item_adopt( next?: any ): any
		type_receive( next?: any ): any
		Type_icon( id: any): $mol_icon
		enabled( ): boolean
		type_mutable( ): ReturnType< $mol_vary_edit['enabled'] >
		type( next?: string ): string
		Type( ): $mol_select
		Type_drop( ): $mol_drop
		bool( next?: boolean ): boolean
		Bool( ): $mol_check_box
		bint( next?: bigint ): bigint
		text_selection( next?: readonly(number)[] ): readonly(number)[]
		Bint( ): $mol_bigint_field
		real( next?: number ): number
		Real( ): $mol_number
		date( next?: $mol_time_moment ): $mol_time_moment
		Date( ): $mol_date
		text( next?: string ): string
		Text( ): $mol_textarea
		expanded( next?: boolean ): boolean
		Item_expand( ): $mol_check_expand
		item_add( next?: any ): any
		Item_add_icon( ): $mol_icon_plus
		Item_add( ): $mol_button_minor
		field_add( next?: any ): any
		Field_add_icon( ): $mol_icon_plus
		Field_add( ): $mol_string
		head( ): readonly(any)[]
		Head( ): $mol_bar
		item_receive( id: any, next?: any ): any
		item_drag_end( id: any, next?: any ): any
		transfer_vary( id: any): string
		item_key( id: any): any
		Item_key( id: any): $mol_view
		Item_drag( id: any): $mol_drag
		Item_drop( id: any): $mol_drop
		item_val( id: any, next?: any ): any
		item_selection( id: any, next?: readonly(any)[] ): readonly(any)[]
		Item_val( id: any): $mol_vary_edit
		Item( id: any): $mol_bar
		body( ): readonly(any)[]
		Body( ): $mol_list
		schema( ): any
		value( next?: any ): any
		Vary( ): $mol_vary_class
		selection( next?: readonly(any)[] ): readonly(any)[]
		Null_icon( ): $mol_icon_circle_off_outline
		Bool_icon( ): $mol_icon_flag_checkered
		Bint_icon( ): $mol_icon_pound
		Real_icon( ): $mol_icon_division
		Date_icon( ): $mol_icon_clock_outline
		Text_icon( ): $mol_icon_card_text_outline
		List_icon( ): $mol_icon_format_list_bulleted
		Tupl_icon( ): $mol_icon_table
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=edit.view.tree.d.ts.map