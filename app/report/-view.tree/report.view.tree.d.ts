declare namespace $ {

	type $mol_view__sub__K166T3J0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_app_report_rower__cells__77LV6MKX = $mol_type_enforce<
		ReturnType< $mol_app_report['headCells'] >
		,
		ReturnType< $mol_app_report_rower['cells'] >
	>
	type $mol_app_report_tabler__rows__HIQGBBAH = $mol_type_enforce<
		ReturnType< $mol_app_report['rows'] >
		,
		ReturnType< $mol_app_report_tabler['rows'] >
	>
	type $mol_app_report_rower__cells__HE2PE53F = $mol_type_enforce<
		ReturnType< $mol_app_report['rowerCells'] >
		,
		ReturnType< $mol_app_report_rower['cells'] >
	>
	type $mol_app_report_cell__content__DMHS908O = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_content'] >
		,
		ReturnType< $mol_app_report_cell['content'] >
	>
	type $mol_app_report_cell__rows__4WMTU3OZ = $mol_type_enforce<
		ReturnType< $mol_app_report['cellrows'] >
		,
		ReturnType< $mol_app_report_cell['rows'] >
	>
	type $mol_app_report_cell__cols__RPML5YY5 = $mol_type_enforce<
		ReturnType< $mol_app_report['cellCols'] >
		,
		ReturnType< $mol_app_report_cell['cols'] >
	>
	type $mol_view__sub__QFJPZ5GN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_select__value__I3VD226F = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_value'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary__81KFO5E7 = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_options'] >
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_number__value__D6Y910J1 = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	export class $mol_app_report extends $mol_page {
		description( ): string
		descriptor( ): $mol_view
		headCells( ): readonly(any)[]
		headRower( ): $mol_app_report_rower
		rows( ): readonly(any)[]
		tabler( ): $mol_app_report_tabler
		rowerCells( id: any): readonly(any)[]
		cell_content( id: any): any
		cellrows( id: any): number
		cellCols( id: any): number
		cell_value( id: any, next?: any ): any
		cell_options( id: any): Record<string, any>
		title( ): string
		body( ): readonly(any)[]
		rower( id: any): $mol_app_report_rower
		cell( id: any): $mol_app_report_cell
		texter( id: any): $mol_view
		select( id: any): $mol_select
		number( id: any): $mol_number
	}
	
	export class $mol_app_report_tabler extends $mol_view {
		rows( ): readonly(any)[]
		dom_name( ): string
		sub( ): ReturnType< $mol_app_report_tabler['rows'] >
	}
	
	export class $mol_app_report_rower extends $mol_view {
		cells( ): readonly(any)[]
		dom_name( ): string
		sub( ): ReturnType< $mol_app_report_rower['cells'] >
	}
	
	export class $mol_app_report_cell extends $mol_view {
		cols( ): number
		rows( ): number
		content( ): any
		dom_name( ): string
		attr( ): ({ 
			'colspan': ReturnType< $mol_app_report_cell['cols'] >,
			'rowspan': ReturnType< $mol_app_report_cell['rows'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=report.view.tree.d.ts.map