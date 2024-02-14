declare namespace $ {

	type $mol_card__content__CQ6KCTRL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__W5QC30HE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__status__YKF4H87I = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['status'] >
	>
	export class $mol_card_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		Simple( ): $mol_card
		Pending( ): $mol_card
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map