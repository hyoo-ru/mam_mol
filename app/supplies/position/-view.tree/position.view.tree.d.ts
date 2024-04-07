declare namespace $ {

	type $mol_labeler__title__R8JJEL10 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['product_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__1DJM3401 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__9UEZ65W9 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__WF5HSIWU = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__6M580K4Z = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__SXQ54GS9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__Y8KDAG7K = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__KPM80XK0 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['division_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__NLQXUVA3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__H1XWVKZR = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__5M95U3HG = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__NEYVL2MV = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__0LBWVTUP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__X6FJLBFV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__VHTK6CBP = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['quantity_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__O00THNSF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__9N9XV1HH = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['supply_date_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__C8NH9B2O = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__7SCCTBM0 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['store_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__PU7LA8E8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__57QFCG2R = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_view__sub__EU6P148W = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_app_supplies_position extends $mol_card {
		product_title( ): string
		product_name( ): string
		Product_item( ): $mol_labeler
		cost_title( ): string
		cost( ): $mol_unit_money
		Cost( ): $mol_cost
		Cost_item( ): $mol_labeler
		Main_group( ): $mol_row
		division_title( ): string
		division_name( ): string
		Division_item( ): $mol_labeler
		price_label( ): string
		price( ): $mol_unit_money
		Price( ): $mol_cost
		Price_item( ): $mol_labeler
		Addon_group( ): $mol_row
		quantity_title( ): string
		quantity( ): string
		Quantity_item( ): $mol_labeler
		supply_date_title( ): string
		supply_date( ): string
		Supply_date_item( ): $mol_labeler
		store_title( ): string
		store_name( ): string
		Store_item( ): $mol_labeler
		Supply_group( ): $mol_row
		Row( ): $mol_view
		minimal_height( ): number
		position( ): $mol_app_supplies_domain_supply_position
		Content( ): ReturnType< $mol_app_supplies_position['Row'] >
	}
	
}

//# sourceMappingURL=position.view.tree.d.ts.map