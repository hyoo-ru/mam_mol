declare namespace $ {

	type $mol_card__title__8IRS1SI0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__Z34F7T7I = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__EQ9BMOTQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__R6HJY206 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__968DAIIP = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__6WEQ8TVM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__GEKZH42B = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__76PRNXPS = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__G5APQOAM = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__Content__JELX4S7P = $mol_type_enforce<
		ReturnType< $mol_deck_demo['Spam_content'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_deck__items__MI9M9F7M = $mol_type_enforce<
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