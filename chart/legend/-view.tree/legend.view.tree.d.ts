declare namespace $ {

	type $mol_gallery__items__TO5Z6BFS = $mol_type_enforce<
		ReturnType< $mol_chart_legend['graph_legends'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	type $mol_view__sub__6E5J97P4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__T4ZPZ9WI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__IMIXEMP3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_chart_legend extends $mol_scroll {
		graph_legends( ): readonly($mol_view)[]
		Gallery( ): $mol_gallery
		Graph_sample( id: any): any
		Graph_sample_box( id: any): $mol_view
		graph_title( id: any): string
		Graph_title( id: any): $mol_view
		graphs( ): readonly($mol_plot_graph)[]
		graphs_front( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
		Graph_legend( id: any): $mol_view
	}
	
}

//# sourceMappingURL=legend.view.tree.d.ts.map