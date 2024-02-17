declare namespace $ {

	type $mol_image__uri__J2I08KWM = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_view__sub__SZYCZFGZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_stack__sub__F2NY988B = $mol_type_enforce<
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