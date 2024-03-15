declare namespace $ {

	type $mol_view__sub__2RT2CNTY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__dom_id__CKFYS5BI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__2C7AR2OS = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__JVNFN2NY = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__BY8T22Z0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__KPE7F7WN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__G5Z8U4KC = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_10K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__7YZYHFKP = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__EN5ZLMRQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__PGHUNB1G = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['append_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__65DPE2UV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__RFUP8UB6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__TVGMHAXM = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['update_10'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__F37QQ9SG = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__W5MGLPU1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__7IFY25LL = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['clear'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__NRQBQOFR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__N998VX3U = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__JECFAMP7 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['swap'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_row__sub__CJX1H177 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_row__sub__7CKXIWH1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_perf_jsfb_row_title__V3D8JRP2 = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[0]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row_title__P8Z2Y0G0 = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[1]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row__selected__UVSYP497 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_selected'] >
		,
		ReturnType< $mol_perf_jsfb_row['selected'] >
	>
	type $mol_perf_jsfb_row__drop__ZSMGJACE = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_drop'] >
		,
		ReturnType< $mol_perf_jsfb_row['drop'] >
	>
	type $mol_perf_jsfb_row__id__QIO0DTBZ = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_id'] >
		,
		ReturnType< $mol_perf_jsfb_row['id'] >
	>
	type $mol_list__rows__VM8RQACO = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__9U5CAEAE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_perf_jsfb extends $mol_scroll {
		title( ): string
		Title( ): $mol_view
		create_1K( next?: any ): any
		Create_1K( ): $mol_button_major
		create_10K( next?: any ): any
		Create_10K( ): $mol_button_major
		append_1K( next?: any ): any
		Append_1K( ): $mol_button_major
		update_10( next?: any ): any
		Update_10( ): $mol_button_major
		clear( next?: any ): any
		Clear( ): $mol_button_major
		swap( next?: any ): any
		Swap( ): $mol_button_major
		Controls( ): $mol_row
		Head( ): $mol_row
		row_title( id: any, next?: ReturnType< ReturnType< $mol_perf_jsfb['Row'] >['title'] > ): ReturnType< ReturnType< $mol_perf_jsfb['Row'] >['title'] >
		row_selected( id: any, next?: boolean ): boolean
		row_drop( id: any, next?: any ): any
		row_id( id: any): string
		Row( id: any): $mol_perf_jsfb_row
		rows( ): readonly($mol_view)[]
		Rows( ): $mol_list
		Content( ): $mol_list
		sub( ): readonly(any)[]
	}
	
	type $mol_view__sub__86RJL9QF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_check__checked__MDCPS77J = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb_row['selected'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__sub__XN8DCN1V = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_button_minor__sub__GRBCOSYD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__DNP44FLM = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb_row['drop'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	export class $mol_perf_jsfb_row extends $mol_view {
		id( ): string
		Id( ): $mol_view
		selected( next?: boolean ): boolean
		title( next?: string ): string
		Title( ): $mol_check
		Drop_icon( ): $mol_icon_cross
		drop( next?: any ): any
		Drop( ): $mol_button_minor
		minimal_height( ): number
		minimal_width( ): number
		attr( ): ({ 
			'mol_perf_jsfb_row_selected': ReturnType< $mol_perf_jsfb_row['selected'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=jsfb.view.tree.d.ts.map