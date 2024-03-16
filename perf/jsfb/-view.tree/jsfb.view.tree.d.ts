declare namespace $ {

	type $mol_view__sub__EVCFIGF8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__dom_id__BFR72BTI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__AK0V6KM3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__2HSZOHPA = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__S8XS79VS = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__P87P1M4F = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__0DJHHKV8 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_10K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__F4M61U18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__FTU7KIYX = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__PU9441TV = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['append_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__SE2ILLOW = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__L1605MLX = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__MBLNLKT5 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['update_10'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__HECAFFWE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__YZCQGFHG = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__GVST19NY = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['clear'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__J1S1TUBQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__HJ9WNLZ5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__DPICAPUY = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['swap'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_row__sub__6ZC00KGW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_row__sub__T7YD72BG = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_perf_jsfb_row_title__X7K6SS38 = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[0]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row_title__E32EG723 = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[1]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row__selected__CDF01WZS = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_selected'] >
		,
		ReturnType< $mol_perf_jsfb_row['selected'] >
	>
	type $mol_perf_jsfb_row__drop__ZLAZHC9G = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_drop'] >
		,
		ReturnType< $mol_perf_jsfb_row['drop'] >
	>
	type $mol_perf_jsfb_row__id__7ZU3UP58 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_id'] >
		,
		ReturnType< $mol_perf_jsfb_row['id'] >
	>
	type $mol_list__rows__U79WBCWG = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__L11LOU90 = $mol_type_enforce<
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
	
	type $mol_view__sub__MR6BE045 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_check__checked__6QFFL443 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb_row['selected'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__sub__1I1YBDQV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_button_minor__sub__GNHO5OGZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__769GZ0RV = $mol_type_enforce<
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