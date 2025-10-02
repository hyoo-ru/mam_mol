namespace $.$$ {

	export class $mol_chart_pane extends $.$mol_chart_pane {

		graph_hue( index : number ) {
			return ( 360 + ( this.hue_base() + this.hue_shift() * index ) % 360 ) % 360
		}

		@ $mol_mem
		graphs_colored() {
			const graphs = this.graphs_visible()
			const focused = this.graph_focused()
			for (let index = 0; index < graphs.length; index++) {
				graphs[index].hue( this.graph_hue( index ) )
				if( graphs[index] instanceof $mol_chart_graph ) {
					(graphs[index] as $mol_chart_graph).focused( focused === index )
				}
			}

			return graphs
		}

	}

}
