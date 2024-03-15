declare namespace $ {

	type $mol_image__uri__S7PQOCFU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_view__sub__F1955J99 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_stack__sub__9C8F22Q2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_stack['sub'] >
	>
	export class $mol_stack_demo extends $mol_example_small {
		Back( ): $mol_image
		Front( ): $mol_view
		Collage( ): $mol_stack
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map