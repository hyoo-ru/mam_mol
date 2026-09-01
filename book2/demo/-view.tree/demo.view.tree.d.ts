declare namespace $ {

	type $mol_view__sub_mol_book2_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_book2_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_book2_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_book2_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_book2__Placeholder_mol_book2_demo_5 = $mol_type_enforce<
		ReturnType< $mol_book2_demo['Side'] >
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages_mol_book2_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_book2['pages'] >
	>
	export class $mol_book2_demo extends $mol_example_large {
		Side( ): $mol_view
		First( ): $mol_view
		Second( ): $mol_view
		Third( ): $mol_view
		View( ): $mol_book2
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map