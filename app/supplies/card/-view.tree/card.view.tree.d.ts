declare namespace $ {

	type $mol_labeler__title__ABXF0C7V = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['code_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__OBH806YJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_unit_money__valueOf__Z62EGXJP = $mol_type_enforce<
		number
		,
		ReturnType< $mol_unit_money['valueOf'] >
	>
	type $mol_cost__value__LAZ89K5F = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['cost'] >
		,
		ReturnType< $mol_cost['value'] >
	>
	type $mol_labeler__title__K0NXSLK0 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['cost_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__BLS9QWRU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title__2J6W241V = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['provider_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__N9C8CCF9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__SBMF3YLR = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['items'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_card__status__I1J17W0T = $mol_type_enforce<
		ReturnType< $mol_app_supplies_card['status'] >
		,
		ReturnType< $mol_card['status'] >
	>
	type $mol_card__Content__FQN53W8V = $mol_type_enforce<
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