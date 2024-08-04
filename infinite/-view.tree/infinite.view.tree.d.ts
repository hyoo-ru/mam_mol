declare namespace $ {

	type $mol_view__minimal_width__NACOCOW9 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height__L7G49V33 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__T4TL38I0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_width__N3YWWU5I = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height__ZUQM0Z07 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__GVMW84OA = $mol_type_enforce<
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