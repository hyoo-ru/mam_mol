declare namespace $ {

	type $mol_card__title__R14MAUPX = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__A7LBAZUQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__FST1199G = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__3KJW4V96 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__RLCGC4XZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__NZMUOY8V = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__Q2YO9ZZ6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__UW1MNXC7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__FAFI6W4D = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__Content__C535H95T = $mol_type_enforce<
		ReturnType< $mol_deck_demo['Spam_content'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_deck__items__3W0KHOFQ = $mol_type_enforce<
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