declare namespace $ {

	type $mol_labeler__title__1JORZCD1 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['code_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__DAD283K0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__LBUVCNCG = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__P4P9Q3ID = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__30FGJ5R5 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__QLT6A2HL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__98350526 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['provider_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__495HN7GD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__FS5J4GCH = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['items'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_card__status__UEBO5AQU = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['status'] >
		,
		ReturnType< $mol_card['status'] >
	>
	type $mol_card__Content__C1C30M6V = $mol_type_enforce<
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