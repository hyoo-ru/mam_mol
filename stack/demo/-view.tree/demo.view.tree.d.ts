declare namespace $ {

	type $mol_image__uri__FHG7CZMD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_view__sub__OD6EP156 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_stack__sub__96XQUBF5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_stack['sub'] >
	>
	export class $mol_stack_demo extends $mol_example_small {
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
		Back( ): $mol_image
		Front( ): $mol_view
		Collage( ): $mol_stack
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map