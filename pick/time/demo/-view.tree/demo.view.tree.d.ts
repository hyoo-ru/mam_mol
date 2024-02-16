declare namespace $ {

	type $mol_time_moment__JQCHKD9A = $mol_type_enforce<
		[ string ]
		,
		ConstructorParameters< typeof $mol_time_moment >
	>
	type $mol_pick_time__value_moment__B94XYI9Y = $mol_type_enforce<
		ReturnType< $mol_pick_time_demo['moment'] >
		,
		ReturnType< $mol_pick_time['value_moment'] >
	>
	export class $mol_pick_time_demo extends $mol_example_small {
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		moment( next?: $mol_time_moment ): $mol_time_moment
		Picker( ): $mol_pick_time
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map