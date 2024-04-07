declare namespace $ {

	type $mol_view__sub__7Y9ZC92J = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__dom_id__N26OHVTY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__0CBJJ1ML = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__3DQV3RZL = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__7AHDPLO3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__XFPJNG0P = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__RKYVVDHM = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_10K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__MWJ5CM8C = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__ER1HNDIO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__2GLQ339X = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['append_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__HW7790L3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__QUGJ2ADC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__CMMVO7KJ = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['update_10'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__WCLGBNO7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__Q39Y66QN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__MOGZ23YE = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['clear'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__JQFOS37V = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__FXAANRXZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__K7PLLT0C = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['swap'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_row__sub__7OX14UHD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_row__sub__29C810TS = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_perf_jsfb_row_title__P8WHVVHL = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[0]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row_title__NJRBZWXC = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[1]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row__selected__6UO4E5A3 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_selected'] >
		,
		ReturnType< $mol_perf_jsfb_row['selected'] >
	>
	type $mol_perf_jsfb_row__drop__2WX39KT3 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_drop'] >
		,
		ReturnType< $mol_perf_jsfb_row['drop'] >
	>
	type $mol_perf_jsfb_row__id__KAMUQAS9 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_id'] >
		,
		ReturnType< $mol_perf_jsfb_row['id'] >
	>
	type $mol_list__rows__LCNHDJ6Z = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__FYZIYT23 = $mol_type_enforce<
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
	
	type $mol_view__sub__KGXQAMPL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_check__checked__4UCPEPHF = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb_row['selected'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__sub__D8V5FLMP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_button_minor__sub__712DRW3K = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__WMKWF9BW = $mol_type_enforce<
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