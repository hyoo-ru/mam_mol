declare namespace $ {

	type $mol_view__minimal_width__UNDJ6Y1V = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height__PMJJYQ9Z = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__Z6X77O31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_width__DJVVL9D6 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height__OD7B2Q6M = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__BXHZXKFN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_infinite extends $mol_list {
		before_load( id: any): any
		after_load( id: any): any
		before( id: any): readonly(any)[]
		after( id: any): readonly(any)[]
		row_ids( next?: readonly(any)[] ): readonly(any)[]
		render_over( ): number
		Row( id: any): $mol_view
		Before( id: any): $mol_view
		After( id: any): $mol_view
	}
	
}

//# sourceMappingURL=infinite.view.tree.d.ts.map