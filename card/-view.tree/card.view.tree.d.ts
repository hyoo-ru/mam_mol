declare namespace $ {

	type $mol_view__sub__F5FHZFV0 = $mol_type_enforce<
		ReturnType< $mol_card['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height__VQ6GBW8Q = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__84KY0KC3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_card extends $mol_list {
		status( ): string
		content( ): readonly($mol_view_content)[]
		Content( ): $mol_view
		status_text( ): ReturnType< $mol_card['status'] >
		Status( ): $mol_view
		attr( ): ({ 
			'mol_card_status_type': ReturnType< $mol_card['status'] >,
		})  & ReturnType< $mol_list['attr'] >
		rows( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map