declare namespace $ {

	type $mol_view__minimal_width__WA1N7BL8 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height__HQP2TJXE = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__YZAI0PPM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_width__OQ9T62US = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height__EXVQHG4I = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__AABZ1A6A = $mol_type_enforce<
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