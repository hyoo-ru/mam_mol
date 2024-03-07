declare namespace $ {

	type $mol_select__Filter__RP16GU6T = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value__MEB0JQKM = $mol_type_enforce<
		ReturnType< $mol_select_demo_priority['priority'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__options__ZIN35ND7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_select['options'] >
	>
	export class $mol_select_demo_priority extends $mol_example_small {
		priority( next?: string ): string
		Priority( ): $mol_select
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=priority.view.tree.d.ts.map