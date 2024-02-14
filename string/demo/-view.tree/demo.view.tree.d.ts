declare namespace $ {

	type $mol_string__value__I64SUHM6 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint__ANTXVG81 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__HI49SZ9K = $mol_type_enforce<
		ReturnType< $mol_string_demo['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint__1VBH8XB3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__PY76PBZ5 = $mol_type_enforce<
		ReturnType< $mol_string_demo['broken'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__value__6SE3JDV2 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__disabled__HH1C2LVX = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_string['disabled'] >
	>
	type $mol_string__value__5KMLY4D5 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string_button__value__8LS53HRX = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string_button['value'] >
	>
	export class $mol_string_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		name( next?: string ): string
		Simple( ): $mol_string
		Hint( ): $mol_string
		broken( next?: string ): string
		Broken( ): $mol_string
		name2( next?: string ): string
		Filled( ): $mol_string
		Disabled( ): $mol_string
		Button( ): $mol_string_button
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map