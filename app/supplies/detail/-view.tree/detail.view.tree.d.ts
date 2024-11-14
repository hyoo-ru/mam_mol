declare namespace $ {

	type $mol_link__sub_mol_app_supplies_detail_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_app_supplies_detail_2 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['close_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_3 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['provider_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_5 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['customer_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_7 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['supply_group_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_9 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['ballance_unit_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__title_mol_app_supplies_detail_11 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['org_title'] >
		,
		ReturnType< $mol_row['title'] >
	>
	type $mol_row__sub_mol_app_supplies_detail_12 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['org_items'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_13 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['contract_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_15 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['pay_method_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_17 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['manager_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_mol_app_supplies_detail_19 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['debitod_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_app_supplies_detail_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__title_mol_app_supplies_detail_21 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['cons_title'] >
		,
		ReturnType< $mol_row['title'] >
	>
	type $mol_row__sub_mol_app_supplies_detail_22 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['cons_items'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_deck__items_mol_app_supplies_detail_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_deck['items'] >
	>
	type $mol_card__Content_mol_app_supplies_detail_24 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['Descr_deck'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_attach__items_mol_app_supplies_detail_25 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['attachments'] >
		,
		ReturnType< $mol_attach['items'] >
	>
	type $mol_attach__attach_new_mol_app_supplies_detail_26 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['attach_new'] >
		,
		ReturnType< $mol_attach['attach_new'] >
	>
	type $mol_section__head_mol_app_supplies_detail_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['head'] >
	>
	type $mol_section__content_mol_app_supplies_detail_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_unit_money__valueOf_mol_app_supplies_detail_29 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value_mol_app_supplies_detail_30 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_list__rows_mol_app_supplies_detail_31 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['positions'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_section__head_mol_app_supplies_detail_32 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['positions_head'] >
		,
		ReturnType< $mol_section['head'] >
	>
	type $mol_section__Content_mol_app_supplies_detail_33 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['Positions'] >
		,
		ReturnType< $mol_section['Content'] >
	>
	type $mol_list__rows_mol_app_supplies_detail_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_check_box__checked_mol_app_supplies_detail_35 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['approved'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_app_supplies_detail_36 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['approved_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_app_supplies_position__position_mol_app_supplies_detail_37 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_detail['position'] >
		,
		ReturnType< $mol_app_supplies_position['position'] >
	>
	export class $mol_app_supplies_detail extends $mol_page {
		Close_icon( ): $mol_icon_close
		close_arg( ): ({ 
			'supply': any,
		}) 
		Close( ): $mol_link
		org_title( ): string
		provider_title( ): string
		provider_name( ): string
		Provider( ): $mol_labeler
		customer_label( ): string
		consumer_name( ): string
		Consumer( ): $mol_labeler
		supply_group_title( ): string
		supply_group_name( ): string
		Supply_group( ): $mol_labeler
		ballance_unit_title( ): string
		ballance_unit_name( ): string
		Ballance_unit_item( ): $mol_labeler
		org_items( ): readonly(any)[]
		Org( ): $mol_row
		cons_title( ): string
		contract_title( ): string
		contract_id( ): string
		Contract( ): $mol_labeler
		pay_method_title( ): string
		pay_method_name( ): string
		Pay_method( ): $mol_labeler
		manager_title( ): string
		manager_name( ): string
		Manager( ): $mol_labeler
		debitod_title( ): string
		debitor_name( ): string
		Debitor( ): $mol_labeler
		cons_items( ): readonly(any)[]
		Cons( ): $mol_row
		Descr_deck( ): $mol_deck
		Descr_card( ): $mol_card
		attach_title( ): string
		attachments( ): readonly(string)[]
		attach_new( next?: any ): any
		Attach( ): $mol_attach
		Attach_section( ): $mol_section
		positions_title( ): string
		cost( ): $mol_unit_money
		Cost_value( ): $mol_cost
		positions_head( ): readonly(any)[]
		positions( ): readonly($mol_view)[]
		Positions( ): $mol_list
		Positions_section( ): $mol_section
		Content( ): $mol_list
		approved( next?: boolean ): boolean
		approved_title( ): string
		Approve( ): $mol_check_box
		actions( ): readonly(any)[]
		position( id: any): any
		supply( ): any
		title( ): string
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
		foot( ): ReturnType< $mol_app_supplies_detail['actions'] >
		Position( id: any): $mol_app_supplies_position
	}
	
}

//# sourceMappingURL=detail.view.tree.d.ts.map