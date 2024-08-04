declare namespace $ {

	type $mol_view__sub__R7JGU4UY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__title__TCZD4RA4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__STAX10ZK = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['start'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title__77E3LHMU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__9IIDLRHM = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['stop'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_view__sub__08UGF2UN = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['labels'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__style__H2P7YZFM = $mol_type_enforce<
		({ 
			'color': ReturnType< $mol_perf_dopes['label_color'] >,
			'transform': ReturnType< $mol_perf_dopes['label_transform'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__sub__88D7NR9K = $mol_type_enforce<
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