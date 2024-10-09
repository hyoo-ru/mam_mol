declare namespace $ {

	type $mol_string__value__69AJOOFR = $mol_type_enforce<
		ReturnType< $mol_string_demo['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint__DWLMHXEN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__1D49NJPR = $mol_type_enforce<
		ReturnType< $mol_string_demo['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint__615RHALV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__SVK3JD1S = $mol_type_enforce<
		ReturnType< $mol_string_demo['broken'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__value__QNCVL9TA = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__disabled__Z4BKEGL2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_string['disabled'] >
	>
	type $mol_string__value__CO3IWXNJ = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string_button__value__6LE2B75R = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string_button['value'] >
	>
	export class $mol_string_demo extends $mol_example_small {
		name( next?: string ): string
		Simple( ): $mol_string
		Hint( ): $mol_string
		broken( next?: string ): string
		Broken( ): $mol_string
		name2( next?: string ): string
		Filled( ): $mol_string
		Disabled( ): $mol_string
		Button( ): $mol_string_button
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map