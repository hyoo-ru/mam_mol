declare namespace $ {

	type $mol_chart_legend__graphs__MWZ79AVJ = $mol_type_enforce<
		ReturnType< $mol_chart['graphs_colored'] >
		,
		ReturnType< $mol_chart_legend['graphs'] >
	>
	type $mol_chart_zoom__8MKSG1RI = $mol_type_enforce<
		Parameters< $mol_chart['zoom'] >[0]
		,
		Parameters< ReturnType< $mol_chart['Plot'] >['scale_x'] >[0]
	>
	type $mol_plot_pane__zoom__LFCPWY6W = $mol_type_enforce<
		ReturnType< $mol_chart['zoom'] >
		,
		ReturnType< $mol_plot_pane['zoom'] >
	>
	type $mol_plot_pane__gap_left__AZEGR4UU = $mol_type_enforce<
		ReturnType< $mol_chart['gap_left'] >
		,
		ReturnType< $mol_plot_pane['gap_left'] >
	>
	type $mol_plot_pane__gap_right__59QTY286 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_right'] >
		,
		ReturnType< $mol_plot_pane['gap_right'] >
	>
	type $mol_plot_pane__gap_bottom__NGPPPBTU = $mol_type_enforce<
		ReturnType< $mol_chart['gap_bottom'] >
		,
		ReturnType< $mol_plot_pane['gap_bottom'] >
	>
	type $mol_plot_pane__gap_top__IGFJTI4R = $mol_type_enforce<
		ReturnType< $mol_chart['gap_top'] >
		,
		ReturnType< $mol_plot_pane['gap_top'] >
	>
	type $mol_plot_pane__graphs__N0H1B2TY = $mol_type_enforce<
		ReturnType< $mol_chart['graphs'] >
		,
		ReturnType< $mol_plot_pane['graphs'] >
	>
	type $mol_plot_pane__hue_base__508CUP7G = $mol_type_enforce<
		ReturnType< $mol_chart['hue_base'] >
		,
		ReturnType< $mol_plot_pane['hue_base'] >
	>
	type $mol_plot_pane__hue_shift__AZ1OT8VT = $mol_type_enforce<
		ReturnType< $mol_chart['hue_shift'] >
		,
		ReturnType< $mol_plot_pane['hue_shift'] >
	>
	export class $mol_chart extends $mol_view {
		gap_hor( ): number
		gap_vert( ): number
		gap_left( ): ReturnType< $mol_chart['gap_hor'] >
		gap_right( ): ReturnType< $mol_chart['gap_hor'] >
		gap_bottom( ): ReturnType< $mol_chart['gap_vert'] >
		gap_top( ): ReturnType< $mol_chart['gap_vert'] >
		graphs( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
		Legend( ): $mol_chart_legend
		zoom( next?: ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] > ): ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] >
		graphs_colored( ): ReturnType< ReturnType< $mol_chart['Plot'] >['graphs_colored'] >
		hue_base( ): number
		hue_shift( ): number
		Plot( ): $mol_plot_pane
	}
	
}

//# sourceMappingURL=chart.view.tree.d.ts.map