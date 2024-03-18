declare namespace $ {

	type $mol_view__sub__0EBDKY89 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__title__G2C1XBXM = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__TGXLIT40 = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['start'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title__2Y8VUHXQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__LRV72OYJ = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['stop'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_view__sub__B56FKCDM = $mol_type_enforce<
		ReturnType< $mol_perf_dopes['labels'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__style__ZY20ZPOM = $mol_type_enforce<
		({ 
			'color': ReturnType< $mol_perf_dopes['label_color'] >,
			'transform': ReturnType< $mol_perf_dopes['label_transform'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__sub__EQG1C3T1 = $mol_type_enforce<
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