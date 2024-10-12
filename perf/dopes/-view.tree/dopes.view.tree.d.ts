declare namespace $ {

	type $mol_view__sub__C9Y4H5VO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__title__1929G8KE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__IJC1MTW5 = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['start'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title__TI5ZVBNH = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__810KCGIH = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['stop'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_view__sub__N1LNPLAC = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['labels'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__style__SFW6IMZD = $mol_type_enforce<
		({ 
			'color': ReturnType< $mol_perf_dopes['label_color'] >,
			'transform': ReturnType< $mol_perf_dopes['label_transform'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__sub__GZY6X1S2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_perf_dopes extends $mol_view {
		speed( ): string
		Speed( ): $mol_view
		start( next?: any ): any
		Start( ): $mol_button_major
		stop( next?: any ): any
		Stop( ): $mol_button_major
		labels( ): readonly(any)[]
		Labels( ): $mol_view
		label_color( id: any): string
		label_transform( id: any): string
		title( ): string
		sub( ): readonly(any)[]
		Label( id: any): $mol_view
	}
	
}

//# sourceMappingURL=dopes.view.tree.d.ts.map