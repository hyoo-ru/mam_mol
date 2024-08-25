declare namespace $ {

	type $mol_labeler__title__HKYTKV6Z = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['product_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__PR66HI7B = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__MW3PAO9W = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__A2QYWKX8 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__YPMVN5IG = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__DKVNKM91 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__0HR22C9N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__HJ58ZL6H = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['division_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__8UM1KQL4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__UO0A2TRZ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__JES3PPMC = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__6C586MGC = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__PHLZWUJ2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__E3VDD7KW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__AT43WHKB = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['quantity_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__ZAPEZQ2G = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__R9JZ9BVX = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['supply_date_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__WKADJFU2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__MKJ57F9O = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['store_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6G2XQ1UR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__ES8ZKZI4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_view__sub__1WKRHXGA = $mol_type_enforce<
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