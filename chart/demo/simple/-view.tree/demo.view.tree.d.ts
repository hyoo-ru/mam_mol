declare namespace $ {

	type $mol_plot_bar__title__VN9KDN5K = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['plan_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_y__GXI8S3PN = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['plan'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_group__title__VW0TLE2I = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['fact_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_y__8LBCNZ6F = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['facts'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__5C8WEPMG = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_ruler_vert__title__4VA7GNK4 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['vert_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_chart_demo_simple_months__FX5M39LK = $mol_type_enforce<
		`January`
		,
		string
	>
	type $mol_chart_demo_simple_months__EYR8YLZE = $mol_type_enforce<
		`February`
		,
		string
	>
	type $mol_chart_demo_simple_months__XBC1W89K = $mol_type_enforce<
		`March`
		,
		string
	>
	type $mol_chart_demo_simple_months__A2XA1Q2J = $mol_type_enforce<
		`April`
		,
		string
	>
	type $mol_plot_mark_hor__title__AFPZS2G7 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['marker_hor_title'] >
		,
		ReturnType< $mol_plot_mark_hor['title'] >
	>
	type $mol_plot_mark_hor__labels__C3LIZWQ8 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['months'] >
		,
		ReturnType< $mol_plot_mark_hor['labels'] >
	>
	type $mol_plot_mark_cross__labels__3LWXI5QN = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['months'] >
		,
		ReturnType< $mol_plot_mark_cross['labels'] >
	>
	type $mol_plot_mark_cross__graphs__GLESHWQ3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_mark_cross['graphs'] >
	>
	type $mol_chart__graphs__QMTAW1ST = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_chart['graphs'] >
	>
	export class $mol_chart_demo_simple extends $mol_example_large {
		plan_title( ): string
		plan( ): readonly(any)[]
		Plan( ): $mol_plot_bar
		fact_title( ): string
		facts( ): readonly(any)[]
		Fact_line( ): $mol_plot_line
		Fact_dots( ): $mol_plot_dot
		Fact( ): $mol_plot_group
		vert_title( ): string
		Vert_ruler( ): $mol_plot_ruler_vert
		marker_hor_title( ): string
		months( ): readonly(string)[]
		Marker_hor( ): $mol_plot_mark_hor
		Marker_cross( ): $mol_plot_mark_cross
		Chart( ): $mol_chart
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map