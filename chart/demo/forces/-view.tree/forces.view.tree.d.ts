declare namespace $ {

	type $mol_plot_dot__title__NAB0Z2VP = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x__G3C0GA8Q = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y__SXQKRBHQ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_dot__points_max__PGDKI397 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['points_max'] >
		,
		ReturnType< $mol_plot_dot['points_max'] >
	>
	type $mol_plot_dot__title__A7MX0TBJ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x__PSAQDM2U = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y__00I3C1IS = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_dot__points_max__0T3MODTN = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['points_max'] >
		,
		ReturnType< $mol_plot_dot['points_max'] >
	>
	type $mol_plot_ruler_vert__title__J6YRWYDW = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['vert_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_ruler_hor__title__4JEZT0QJ = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['hor_title'] >
		,
		ReturnType< $mol_plot_ruler_hor['title'] >
	>
	type $mol_plot_ruler_hor__series_x__F92Y5TXV = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_x'] >
		,
		ReturnType< $mol_plot_ruler_hor['series_x'] >
	>
	type $mol_plot_mark_cross__graphs__PM4EVZ2I = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_mark_cross['graphs'] >
	>
	type $mol_chart__graphs__WDRF9V5Y = $mol_type_enforce<
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