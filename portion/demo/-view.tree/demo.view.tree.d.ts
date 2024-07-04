declare namespace $ {

	type $mol_portion__portion__14P1LSQW = $mol_type_enforce<
		ReturnType< $mol_portion_demo['fist'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	type $mol_portion__portion__4XXQ8WBA = $mol_type_enforce<
		ReturnType< $mol_portion_demo['second'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	type $mol_portion__portion__O3HNC2RC = $mol_type_enforce<
		ReturnType< $mol_portion_demo['third'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	export class $mol_portion_demo extends $mol_example_small {
		fist( ): number
		Empty( ): $mol_portion
		second( ): number
		Partial( ): $mol_portion
		third( ): number
		Full( ): $mol_portion
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map