declare namespace $ {

	type $mol_view__sub__UYB70KMU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__dom_id__JBPHFTN2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__HJOQZKMA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__IOXPXT59 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__C24CI398 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__F03KTPD6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__45OPFEQE = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['create_10K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__M2KW8TIL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__M1WSWLUM = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__2TADVE3U = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['append_1K'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__1FC0XSM2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__74MWKF86 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__YPHAD12J = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['update_10'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__SU6A4WW2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__50CSNE55 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__U7XTPS7E = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['clear'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__dom_id__V7BGM937 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['dom_id'] >
	>
	type $mol_button_major__title__5C9YW5S8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__SXRH7TB9 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['swap'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_row__sub__UWW5DYQQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_row__sub__9H1IKSJU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_perf_jsfb_row_title__JWKRUV8K = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[0]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row_title__E3G6VXVJ = $mol_type_enforce<
		Parameters< $mol_perf_jsfb['row_title'] >[1]
		,
		Parameters< $mol_perf_jsfb['Row'] >[0]
	>
	type $mol_perf_jsfb_row__selected__8Y2F547S = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_selected'] >
		,
		ReturnType< $mol_perf_jsfb_row['selected'] >
	>
	type $mol_perf_jsfb_row__drop__BWOLFHI8 = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_drop'] >
		,
		ReturnType< $mol_perf_jsfb_row['drop'] >
	>
	type $mol_perf_jsfb_row__id__YAI1830J = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['row_id'] >
		,
		ReturnType< $mol_perf_jsfb_row['id'] >
	>
	type $mol_list__rows__06WC7OEP = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__M5LOYQSJ = $mol_type_enforce<
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
	
	type $mol_view__sub__MOPHUQBY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_check__checked__MVJ4I3MO = $mol_type_enforce<
		ReturnType< $mol_perf_jsfb_row['selected'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__sub__M4O98T24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_button_minor__sub__WJZUIB4N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__TJ7Y9SMC = $mol_type_enforce<
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