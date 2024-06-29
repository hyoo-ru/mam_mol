declare namespace $ {

	type $mol_check_group__checks__AZ9GRNOT = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['check_list'] >
		,
		ReturnType< $mol_check_group['checks'] >
	>
	type $mol_check_group__title__I1JCRVVR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_group['title'] >
	>
	type $mol_row__sub__TI373YN0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_check_box__title__4SHA7JC5 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_id'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__3YFKL2E6 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_labeler__title__3H7EG2VV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__K4B7GE89 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Id'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_link_iconed__uri__9YOBG6XE = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__title__9L6FO2AY = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_title'] >
		,
		ReturnType< $mol_link_iconed['title'] >
	>
	type $mol_labeler__title__SQRHI5XV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__CTPQ2E66 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Title'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_select__value__U5AVO1QQ = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_color'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__options__1U3SQ882 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['colors'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title__R0POGPCP = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__30HMCN0Q = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Color'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_switch__value__RCY5QV7X = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_status'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__BCIB8FTZ = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['status_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title__5AP4HPLI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__MO51QOHA = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Status'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_number__value__4624GQWR = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_quantity'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__ICF9T5RB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__VLVSZ4PL = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Quantity'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_date__value_moment__K45PPIZS = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_moment'] >
		,
		ReturnType< $mol_date['value_moment'] >
	>
	type $mol_labeler__title__WDHT579S = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__BSNBYS5P = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Date'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_row__minimal_height__ABYJATYA = $mol_type_enforce<
		number
		,
		ReturnType< $mol_row['minimal_height'] >
	>
	type $mol_row__minimal_width__6AZKFQMZ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_row['minimal_width'] >
	>
	type $mol_row__sub__DVNMKFAY = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_content'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__7ZNCCU5X = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_list_demo_table extends $mol_example {
		check_list( ): readonly($mol_check)[]
		Check( ): $mol_check_group
		Head( ): $mol_row
		row_id( id: any, next?: string ): string
		row_checked( id: any, next?: boolean ): boolean
		Id( id: any): $mol_check_box
		Id_labeler( id: any): $mol_labeler
		row_uri( id: any): string
		row_title( id: any): string
		Title( id: any): $mol_link_iconed
		Title_labeler( id: any): $mol_labeler
		row_color( id: any, next?: string ): string
		colors( ): readonly(any)[]
		Color( id: any): $mol_select
		Color_labeler( id: any): $mol_labeler
		row_status( id: any, next?: string ): string
		status_options( ): ({ 
			'minor': string,
			'major': string,
			'critical': string,
		}) 
		Status( id: any): $mol_switch
		Status_labeler( id: any): $mol_labeler
		row_quantity( id: any, next?: number ): number
		Quantity( id: any): $mol_number
		Quantity_labeler( id: any): $mol_labeler
		row_moment( id: any, next?: $mol_time_moment ): $mol_time_moment
		Date( id: any): $mol_date
		Date_labeler( id: any): $mol_labeler
		row_content( id: any): readonly(any)[]
		Row( id: any): $mol_row
		rows( ): readonly(any)[]
		Rows( ): $mol_list
		title( ): string
		count( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=table.view.tree.d.ts.map