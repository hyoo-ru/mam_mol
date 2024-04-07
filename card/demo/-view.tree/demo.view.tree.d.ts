declare namespace $ {

	type $mol_card__content__2Y22T2KE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__ENZTARZY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__status__EX7M6SG0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['status'] >
	>
	export class $mol_card_demo extends $mol_example_small {
		Simple( ): $mol_card
		Pending( ): $mol_card
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map