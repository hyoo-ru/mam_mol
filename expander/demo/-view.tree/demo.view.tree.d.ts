declare namespace $ {

	type $mol_expander__title__8WL25HTE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content__7UHMOPWW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_expander_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		Content( ): $mol_filler
		Expander( ): $mol_expander
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map