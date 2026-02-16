declare namespace $ {

	type $mol_textarea__value_mol_spell_demo_1 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['article'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_labeler__title_mol_spell_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_spell_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_text_code__text_mol_spell_demo_4 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['segments'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_labeler__title_mol_spell_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_spell_demo_6 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['Segments'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_text_code__text_mol_spell_demo_7 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['report'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_labeler__title_mol_spell_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_spell_demo_9 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['Report'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_list__rows_mol_spell_demo_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_spell_demo extends $mol_example_small {
		article( next?: string ): string
		Article( ): $mol_textarea
		Article_block( ): $mol_labeler
		segments( ): string
		Segments( ): $mol_text_code
		Segments_block( ): $mol_labeler
		report( ): string
		Report( ): $mol_text_code
		Reports_block( ): $mol_labeler
		List( ): $mol_list
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map