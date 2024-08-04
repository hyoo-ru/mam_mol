declare namespace $ {

	type $mol_labeler__title__Y4UPN75Z = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['code_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__WDJNKD9W = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__8WHFW8JP = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__FO0YZVJL = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__0C42KJ4X = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__UY9N3FGO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__AN7M9NS1 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['provider_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__15M05D2C = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__EKB07Y4H = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['items'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_card__status__AVPT0DZD = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['status'] >
		,
		ReturnType< $mol_card['status'] >
	>
	type $mol_card__Content__57SA3QOW = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['Group'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	export class $mol_app_supplies_card extends $mol_link {
		status( ): string
		code_title( ): string
		code( ): string
		Code_item( ): $mol_labeler
		cost_title( ): string
		cost( ): $mol_unit_money
		Cost( ): $mol_cost
		Cost_item( ): $mol_labeler
		provider_title( ): string
		provider_name( ): string
		Provider_item( ): $mol_labeler
		items( ): readonly(any)[]
		Group( ): $mol_row
		Card( ): $mol_card
		supply( ): any
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map