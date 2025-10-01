namespace $.$$ {

	export class $mol_chart_legend extends $.$mol_chart_legend {

		@ $mol_mem
		graphs_front() {
			return this.graphs().filter( graph => graph.Sample()) as readonly $mol_plot_graph[]
		}

		graph_legends() {
			return this.graphs_front().map( ( graph , index )=> this.Graph_legend( index ) ) as readonly $mol_view[]
		}

		graph_title( index : number ) {
			return this.graphs_front()[ index ].title()
		}

		Graph_sample( index : number ) {
			return this.graphs_front()[ index ].Sample()
		}

		graph_focus( index : number, event?: Event ) {
			const current = this.graph_focused()
			this.graph_focused( current === index ? -1 : index )
		}

	}

}
