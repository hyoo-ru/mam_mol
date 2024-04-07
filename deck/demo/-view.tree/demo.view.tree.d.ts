declare namespace $ {

	type $mol_card__title__LVKH85UN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__QL83OKYC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__8E9QUZ7S = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__UERIX7GL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__NJDCOH7D = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__UZ5VLCTV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__S5G4Q4JD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__4JLNDQIM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__AJGBDUDF = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__Content__INPU1YWP = $mol_type_enforce<
		ReturnType< $mol_deck_demo['Spam_content'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_deck__items__SKE0MORR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_deck['items'] >
	>
	export class $mol_deck_demo extends $mol_example_small {
		Greeting( ): $mol_card
		Question( ): $mol_card
		Answer( ): $mol_card
		Command( ): $mol_card
		Spam_content( ): $mol_filler
		Spam( ): $mol_card
		Deck( ): $mol_deck
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map