declare namespace $ {

	type $mol_string__value__DH6XIWO7 = $mol_type_enforce<
		ReturnType< $mol_fetch_demo['url'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_button_major__click__2F22LKV0 = $mol_type_enforce<
		ReturnType< $mol_fetch_demo['fetch_data'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_view__sub__C1KFS2B2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_dump_value__value__ZP3YMK3X = $mol_type_enforce<
		ReturnType< $mol_fetch_demo['data'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	type $mol_list__rows__0HNABTR3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_fetch_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		url( next?: string ): string
		Url( ): $mol_string
		fetch_data( next?: any ): any
		Fetch( ): $mol_button_major
		Request( ): $mol_view
		data( next?: any ): any
		Data( ): $mol_dump_value
		Content( ): $mol_list
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map