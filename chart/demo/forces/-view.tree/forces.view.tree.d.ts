declare namespace $ {

	type $mol_plot_dot__title_mol_chart_demo_forces_1 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x_mol_chart_demo_forces_2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y_mol_chart_demo_forces_3 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_dot__points_max_mol_chart_demo_forces_4 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['points_max'] >
		,
		ReturnType< $mol_plot_dot['points_max'] >
	>
	type $mol_plot_dot__title_mol_chart_demo_forces_5 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x_mol_chart_demo_forces_6 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y_mol_chart_demo_forces_7 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_dot__points_max_mol_chart_demo_forces_8 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['points_max'] >
		,
		ReturnType< $mol_plot_dot['points_max'] >
	>
	type $mol_plot_ruler_vert__title_mol_chart_demo_forces_9 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['vert_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_ruler_hor__title_mol_chart_demo_forces_10 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['hor_title'] >
		,
		ReturnType< $mol_plot_ruler_hor['title'] >
	>
	type $mol_plot_ruler_hor__series_x_mol_chart_demo_forces_11 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_x'] >
		,
		ReturnType< $mol_plot_ruler_hor['series_x'] >
	>
	type $mol_plot_mark_cross__graphs_mol_chart_demo_forces_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_mark_cross['graphs'] >
	>
	type $mol_chart__graphs_mol_chart_demo_forces_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_chart['graphs'] >
	>
	export class $mol_chart_demo_forces extends $mol_example_large {
		forces_left_title( ): string
		forces_left_x( ): readonly(number)[]
		forces_left_y( ): readonly(number)[]
		Forces_left( ): $mol_plot_dot
		forces_right_title( ): string
		forces_right_x( ): readonly(number)[]
		forces_right_y( ): readonly(number)[]
		Forces_right( ): $mol_plot_dot
		vert_title( ): string
		Vert_ruler( ): $mol_plot_ruler_vert
		hor_title( ): string
		Hor_ruler( ): $mol_plot_ruler_hor
		Cross( ): $mol_plot_mark_cross
		Chart( ): $mol_chart
		title( ): string
		samples_count( ): number
		points_max( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=forces.view.tree.d.ts.map