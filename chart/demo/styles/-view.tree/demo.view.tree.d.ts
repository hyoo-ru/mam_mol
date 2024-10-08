declare namespace $ {

	type $mol_plot_bar__title__96F0H8F1 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['receipts_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_x__Y2IO2F4H = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_bar['series_x'] >
	>
	type $mol_plot_bar__series_y__CELRZYJJ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_2_y'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_bar__title__G7WTAFE2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['receipts_confirmed_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_x__X1F3CXFO = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_bar['series_x'] >
	>
	type $mol_plot_bar__series_y__I6H2HDSW = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_3_y'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_dot__title__7YOJBCW3 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['maximum_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x__VMV2S0QF = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y__UU2Q8CAV = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_1_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_line__type__UYEGJ7CJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_line__title__Z6C2FP2A = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['waste_title'] >
		,
		ReturnType< $mol_plot_line['title'] >
	>
	type $mol_plot_line__series_x__Z0QS8MHF = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_line['series_x'] >
	>
	type $mol_plot_line__series_y__CKONKMDH = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_4_y'] >
		,
		ReturnType< $mol_plot_line['series_y'] >
	>
	type $mol_plot_group__title__BFH596F3 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['purchases_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_x__5KQP2EK1 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_group['series_x'] >
	>
	type $mol_plot_group__series_y__4M7RFGJB = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_5_y'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__LBP9A8KT = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_line__type__AJ1UV9SU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_group__title__ZY72E2CS = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['taxes_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_x__YTNFY6WT = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_group['series_x'] >
	>
	type $mol_plot_group__series_y__9JEZU9VI = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_6_y'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__RSDCCXI9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_ruler_vert__title__FSLO4TJD = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['energy_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_mark_hor__title__QDTKE3YQ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['day_title'] >
		,
		ReturnType< $mol_plot_mark_hor['title'] >
	>
	type $mol_plot_mark_hor__series_x__UTJTOAPB = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_mark_hor['series_x'] >
	>
	type $mol_chart__graphs__YZ6DOZAQ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['graphs'] >
		,
		ReturnType< $mol_chart['graphs'] >
	>
	export class $mol_chart_demo_styles extends $mol_example_large {
		receipts_title( ): string
		series_x( ): readonly(number)[]
		series_2_y( ): readonly(number)[]
		Receipts( ): $mol_plot_bar
		receipts_confirmed_title( ): string
		series_3_y( ): readonly(number)[]
		Receipts_confirmed( ): $mol_plot_bar
		maximum_title( ): string
		series_1_y( ): readonly(number)[]
		Maximum( ): $mol_plot_dot
		waste_title( ): string
		series_4_y( ): readonly(number)[]
		Waste( ): $mol_plot_line
		purchases_title( ): string
		series_5_y( ): readonly(number)[]
		Purchases_fill( ): $mol_plot_fill
		Purchases_line( ): $mol_plot_line
		Purchases_dots( ): $mol_plot_dot
		Purchases( ): $mol_plot_group
		taxes_title( ): string
		series_6_y( ): readonly(number)[]
		Taxes_fill( ): $mol_plot_fill
		Taxes_line( ): $mol_plot_line
		Taxes_dots( ): $mol_plot_dot
		Taxes( ): $mol_plot_group
		energy_title( ): string
		Energy( ): $mol_plot_ruler_vert
		day_title( ): string
		Day( ): $mol_plot_mark_hor
		graphs( ): readonly(any)[]
		Chart( ): $mol_chart
		title( ): string
		samples_count( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map