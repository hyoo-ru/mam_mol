declare namespace $ {

	type $mol_expander__title__1UOIV8QO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content__ILQGVQKO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_expander_demo extends $mol_example_small {
		Content( ): $mol_filler
		Expander( ): $mol_expander
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map