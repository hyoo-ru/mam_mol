declare namespace $ {

	type $mol_plot_bar__title__KU8V6CHO = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['receipts_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_x__N2SQ77BQ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_bar['series_x'] >
	>
	type $mol_plot_bar__series_y__1YU8ZWU2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_2_y'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_bar__title__Z14FAJ8H = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['receipts_confirmed_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_x__IIQ25BVW = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_bar['series_x'] >
	>
	type $mol_plot_bar__series_y__PHO9COPV = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_3_y'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_dot__title__R2QKZU18 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['maximum_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x__JANR01X2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y__DMURBT7M = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_1_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_line__type__COM9LCAR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_line__title__I8W95DUJ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['waste_title'] >
		,
		ReturnType< $mol_plot_line['title'] >
	>
	type $mol_plot_line__series_x__4UEEIQK1 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_line['series_x'] >
	>
	type $mol_plot_line__series_y__NXZRT3PU = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_4_y'] >
		,
		ReturnType< $mol_plot_line['series_y'] >
	>
	type $mol_plot_group__title__LCXFL8CP = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['purchases_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_x__KOAZB3GE = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_group['series_x'] >
	>
	type $mol_plot_group__series_y__2VGD8H8V = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_5_y'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__XPLN8JKI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_line__type__OC37GZXL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_group__title__E8BZ4E7D = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['taxes_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_x__5HLETEJH = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_group['series_x'] >
	>
	type $mol_plot_group__series_y__BEOFIK7Z = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_6_y'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__A9MIC9ZU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_ruler_vert__title__E3608JFG = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['energy_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_mark_hor__title__SF43HTP4 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['day_title'] >
		,
		ReturnType< $mol_plot_mark_hor['title'] >
	>
	type $mol_plot_mark_hor__series_x__LOUR1CGZ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_mark_hor['series_x'] >
	>
	type $mol_chart__graphs__P3VBZN4E = $mol_type_enforce<
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