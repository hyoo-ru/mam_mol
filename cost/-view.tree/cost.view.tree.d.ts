declare namespace $ {

	type $mol_view__sub_mol_cost_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_cost_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_cost_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_cost extends $mol_view {
		prefix( ): string
		Prefix( ): $mol_view
		value_view( ): string
		Value( ): $mol_view
		postfix( ): string
		Postfix( ): $mol_view
		value( ): any
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=cost.view.tree.d.ts.map