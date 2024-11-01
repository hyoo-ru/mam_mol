declare namespace $ {

	type $mol_labeler__title__LK1GTE6Z = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['product_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__RHLYK7Y2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__YGKUQ5ZK = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__OQ2JYMSN = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__AC0K78LL = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__81R0WTAM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__A08QMBZN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__S5VHCNNB = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['division_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__8S3C6HED = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__FZ56T6FW = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__PWGYTA72 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__BOAVADDI = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['price_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__ZZ5NS8MC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__DLPL6MAM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_labeler__title__TEL7FIK9 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['quantity_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__H80419W7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__1BNZEGIO = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['supply_date_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__49XXB2GT = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__IVI7RLLN = $mol_type_enforce<
		ReturnType< $mol_app_supplies_position['store_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__2AQLNBY1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__6K1HZ17M = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_view__sub__TRAC46PX = $mol_type_enforce<
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