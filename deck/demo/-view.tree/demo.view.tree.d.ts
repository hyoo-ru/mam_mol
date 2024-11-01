declare namespace $ {

	type $mol_card__title__VR4Q67AI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__VF8XDOA4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__6GVKTDUJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__T8TW00X0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__96BN62PD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__2TCT2PWL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__FIVZL885 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content__IWGM8W27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title__MUZ4MIHB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__Content__AUO2J86M = $mol_type_enforce<
		ReturnType< $mol_deck_demo['Spam_content'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_deck__items__WEF3E92X = $mol_type_enforce<
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