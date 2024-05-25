declare namespace $ {

	type $mol_switch__value__RN7WQ3GN = $mol_type_enforce<
		ReturnType< $mol_transit_demo['align'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__TC06IKQQ = $mol_type_enforce<
		({ 
			'flex-start': string,
			'center': string,
			'flex-end': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_switch__value__W4DTB1JP = $mol_type_enforce<
		ReturnType< $mol_transit_demo['justify'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__GL7XMHQG = $mol_type_enforce<
		({ 
			'flex-start': string,
			'center': string,
			'flex-end': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_list__rows__ZNSKFWO8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_transit__Sub__PNXWSULM = $mol_type_enforce<
		ReturnType< $mol_transit_demo['Float'] >
		,
		ReturnType< $mol_transit['Sub'] >
	>
	export class $mol_transit_demo extends $mol_example_large {
		align( next?: string ): string
		Align( ): $mol_switch
		justify( next?: string ): string
		Justify( ): $mol_switch
		Float( ): $mol_list
		Transit( ): $mol_transit
		title( ): string
		style( ): ({ 
			'justify-content': ReturnType< $mol_transit_demo['justify'] >,
			'align-items': ReturnType< $mol_transit_demo['align'] >,
		}) 
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map