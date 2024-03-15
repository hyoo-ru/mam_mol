declare namespace $ {

	type $mol_labeler__title__OW3FNHQF = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['product_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__7NLONTXQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__XGK10MOM = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__Y437RJKL = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__53TH50N9 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__7UEGRQPM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__XKVP1WDM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__XIQ6Y8SW = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['division_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__5E7OIMOA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__DF5URR0Z = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__V781KR3E = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__XVXBHLW9 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__ENU70EDO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__OXOELDWQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__KY41KGGJ = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['quantity_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__M5OXJXOY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__JA59CQ2C = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['supply_date_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6MIQHY8U = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__Q4H8Y717 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['store_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__J7XJFU6Z = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__TKV1ILZC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_view__sub__SGL1Z75W = $mol_type_enforce<
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