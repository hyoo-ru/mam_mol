declare namespace $ {

	type $mol_section__title__NRB5ZIUG = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content__CELZW1B2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	export class $mol_section_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		Section_content( ): $mol_filler
		Section( ): $mol_section
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map