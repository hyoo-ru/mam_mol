declare namespace $ {

	type $mol_view__sub__5A9K67T2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__dom_id__CH5XZRCJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__IEQ4IW5N = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__M35BCFUA = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__X12EA7VT = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__T5D10Y7U = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__QPPGO9EJ = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_10K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__UJZEESYO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__9Q1XPJWC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__A7V0A2CM = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['append_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__Q1QE936R = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__AQ3L4CY8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__2YHXNA86 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['update_10'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__FMA1CAF7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__YTFLHMH3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__17FR7FRZ = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['clear'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__6KKKYTU7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__Y4I4AY9L = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__B9SUHB5G = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['swap'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_row__sub__1182XWE9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_row__sub__VDD9XQBL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_perf_jsfb_row_title__B0761WBV = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[0]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row_title__T9QOJ8PC = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[1]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row__selected__XTJ56QW9 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_selected'] >
		,
		ReturnType< $mol_perf_jsfb_row['selected'] >
	>
	type $mol_perf_jsfb_row__drop__CV1RY61L = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_drop'] >
		,
		ReturnType< $mol_perf_jsfb_row['drop'] >
	>
	type $mol_perf_jsfb_row__id__3UW8D5CB = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_id'] >
		,
		ReturnType< $mol_perf_jsfb_row['id'] >
	>
	type $mol_list__rows__FO8FE6P3 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__AF4XEA38 = $mol_type_enforce<
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
	
	type $mol_view__sub__UYPS08Z3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_check__checked__XHRRSY5P = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb_row['selected'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__sub__1OTQYKCI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_button_minor__sub__X58K73FO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__ZV5M4ZPM = $mol_type_enforce<
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
		Drop_icon( ): $mol_icon_close
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