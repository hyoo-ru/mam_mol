declare namespace $ {

	type $mol_card__minimal_width__ADMSSBE3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_card['minimal_width'] >
	>
	type $mol_card__minimal_height__TLU8KXVS = $mol_type_enforce<
		number
		,
		ReturnType< $mol_card['minimal_height'] >
	>
	type $mol_card__title__ZC9S6VAF = $mol_type_enforce<
		ReturnType< $mol_row_demo_products['product_title'] >
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_row__sub__4Z7BD1GW = $mol_type_enforce<
		ReturnType< $mol_row_demo_products['products'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_row_demo_products extends $mol_example {
		title( ): string
		count( ): number
		Product( id: any): $mol_card
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		product_title( id: any): string
		products( ): readonly(any)[]
		Products( ): $mol_row
	}
	
}

//# sourceMappingURL=products.view.tree.d.ts.map