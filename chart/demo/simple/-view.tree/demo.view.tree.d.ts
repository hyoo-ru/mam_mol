declare namespace $ {

	type $mol_plot_bar__title__I2XYJAZG = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['plan_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_y__PN2LP5NX = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['plan'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_group__title__M0S8D9BU = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['fact_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_y__BQGKTFNF = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['facts'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__F0TV9WO8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_ruler_vert__title__J1ABUOX2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['vert_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_chart_demo_simple_months__231P2QOC = $mol_type_enforce<
		`January`
		,
		string
	>
	type $mol_chart_demo_simple_months__ANPP8JJI = $mol_type_enforce<
		`February`
		,
		string
	>
	type $mol_chart_demo_simple_months__ESA0OIES = $mol_type_enforce<
		`March`
		,
		string
	>
	type $mol_chart_demo_simple_months__STRU4MON = $mol_type_enforce<
		`April`
		,
		string
	>
	type $mol_plot_mark_hor__title__JLUVEPH9 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['marker_hor_title'] >
		,
		ReturnType< $mol_plot_mark_hor['title'] >
	>
	type $mol_plot_mark_hor__labels__SBK7MT5H = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['months'] >
		,
		ReturnType< $mol_plot_mark_hor['labels'] >
	>
	type $mol_plot_mark_cross__labels__RFXJDZNY = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['months'] >
		,
		ReturnType< $mol_plot_mark_cross['labels'] >
	>
	type $mol_plot_mark_cross__graphs__GYKGDHH1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_mark_cross['graphs'] >
	>
	type $mol_chart__graphs__D48J9GL3 = $mol_type_enforce<
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