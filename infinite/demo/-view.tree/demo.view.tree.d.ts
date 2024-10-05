declare namespace $ {

	type $mol_avatar__id__801SJO7L = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['id'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_paragraph__title__B4FGDIR7 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['name'] >
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_paragraph__title__7M6W8TJ6 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['city'] >
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_list__rows__XX9790CP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_row__sub__DTELEFE7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_infinite__before__F5QUBQPI = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['before'] >
		,
		ReturnType< $mol_infinite['before'] >
	>
	type $mol_infinite__after__648ORCG0 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['after'] >
		,
		ReturnType< $mol_infinite['after'] >
	>
	type $mol_infinite__Row__XQJHO0AB = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['Item'] >
		,
		ReturnType< $mol_infinite['Row'] >
	>
	type $mol_scroll__sub__9PAPVN1O = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_infinite_demo extends $mol_example_large {
		before( id: any): readonly(any)[]
		after( id: any): readonly(any)[]
		id( id: any): string
		Photo( id: any): $mol_avatar
		name( id: any): string
		Name( id: any): $mol_paragraph
		city( id: any): string
		City( id: any): $mol_paragraph
		Info( id: any): $mol_list
		Item( id: any): $mol_row
		List( ): $mol_infinite
		Scroll( ): $mol_scroll
		title( ): string
		chunk_size( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map