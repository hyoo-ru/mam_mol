namespace $.$$ {
	export class $mol_plot_group extends $.$mol_plot_group {
		
		@ $mol_mem
		graphs_enriched() {
			const graphs = this.graphs()
			for( let graph of graphs ) {
				graph.shift = ()=> this.shift()
				graph.scale = ()=> this.scale()
				graph.size_real = ()=> this.size_real()
				graph.hue = ()=> this.hue()
				graph.series_x = ()=> this.series_x()
				graph.series_y = ()=> this.series_y()
				graph.dimensions_pane = ()=> this.dimensions_pane()
				graph.viewport = ()=> this.viewport()
				graph.cursor_position = ()=> this.cursor_position()
			}
			return graphs
		}
		
		@ $mol_mem
		dimensions() {
			const graphs = this.graphs()
			let next = new this.$.$mol_vector_2d(
				$mol_vector_range_full.inversed,
				$mol_vector_range_full.inversed
			)

			for( let graph of graphs ) {
				next = next.expanded2(graph.dimensions())
			}

			return next
		}

		@ $mol_mem
		graph_samples() {
			return this.graphs().map( graph => graph.Sample() )
		}
		
		back() {
			const graphs = this.graphs_enriched()
			const next = [] as $mol_plot_graph[]
			
			for( let graph of graphs ) next.push( ...graph.back() as $mol_plot_graph[])
			
			return next
		}
		
		front() {
			const graphs = this.graphs_enriched()
			const next = [] as $mol_plot_graph[]
			
			for( let graph of graphs ) next.push( ...graph.front() as $mol_plot_graph[])
			
			return next
		}
		
	}
}
