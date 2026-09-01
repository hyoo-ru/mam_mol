declare namespace $ {

	type $mol_view__sub_mol_form_field_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_form_field extends $mol_labeler {
		state( ): string | null
		name( ): string
		bid( ): string
		Bid( ): $mol_view
		control( ): any
		attr( ): ({ 
			'mol_form_field_state': ReturnType< $mol_form_field['state'] >,
		})  & ReturnType< $mol_labeler['attr'] >
		bids( ): readonly(string)[]
		label( ): readonly(any)[]
		content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map