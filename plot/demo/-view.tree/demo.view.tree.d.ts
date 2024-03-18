declare namespace $ {

	type $mol_plot_line__type__37NNHT3O = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_group__series_y__VV9TNA2H = $mol_type_enforce<
		ReturnType< $mol_plot_demo['saturation_series'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__UP2YYSL5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_group__series_y__MDPCNGVX = $mol_type_enforce<
		ReturnType< $mol_plot_demo['input_series'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs__1F7BPH3V = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_bar__series_y__W65PEH9E = $mol_type_enforce<
		ReturnType< $mol_plot_demo['output_series'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_ruler_vert__title__DLALBR9P = $mol_type_enforce<
		ReturnType< $mol_plot_demo['Voltage_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_ruler_hor__title__4KAQORDH = $mol_type_enforce<
		ReturnType< $mol_plot_demo['Time_title'] >
		,
		ReturnType< $mol_plot_ruler_hor['title'] >
	>
	type $mol_plot_pane__graphs__606OACKC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_pane['graphs'] >
	>
	export class $mol_plot_demo extends $mol_example_large {
		saturation_series( ): readonly(any)[]
		Saturation_fill( ): $mol_plot_fill
		Saturation_line( ): $mol_plot_line
		Saturation( ): $mol_plot_group
		input_series( ): readonly(any)[]
		Input_line( ): $mol_plot_line
		Input_dots( ): $mol_plot_dot
		Input( ): $mol_plot_group
		output_series( ): readonly(any)[]
		Output( ): $mol_plot_bar
		Voltage_title( ): string
		Voltage( ): $mol_plot_ruler_vert
		Time_title( ): string
		Time( ): $mol_plot_ruler_hor
		Plot( ): $mol_plot_pane
		title( ): string
		count( next?: number ): number
		frequency( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map