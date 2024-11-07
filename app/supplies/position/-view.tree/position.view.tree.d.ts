declare namespace $ {

	type $mol_labeler__title__C4R9CLMK = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['product_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__DPEV3DPQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__SZKK7MYR = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__L7GI7PB3 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__IMO2I9Y3 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__R9277KBI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__AMVDGQTC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__O10N8VWB = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['division_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__TBDWXD29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__I98WBA0F = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__G12MY6QD = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__F6R1Q295 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__QD0WQWHR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__FNOVB1KW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__A1MS4GP3 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['quantity_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__FA7NPQVH = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__UW7RJMGZ = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['supply_date_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__RNHMFBR1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__9BSTX7LG = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['store_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6ZOJU0NZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__1LL49Q4M = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_view__sub__BTA3QBWE = $mol_type_enforce<
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