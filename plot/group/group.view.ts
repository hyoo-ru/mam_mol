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
				graph.points_raw = ()=> this.points_raw()
				graph.dimensions_pane = ()=> this.dimensions_pane()
				graph.dimensions = ()=> this.dimensions()
				graph.viewport = ()=> this.viewport()
			}
			return graphs
		}
		
		@ $mol_mem
		graph_samples() {
			return this.graphs().map( graph => graph.Sample() )
		}
		
		back() {
			const graphs = this.graphs_enriched()
			const next = [] as $mol_plot_graph[]
			
			for( let graph of graphs ) next.push( ...graph.back() )
			
			return next
		}
		
		front() {
			const graphs = this.graphs_enriched()
			const next = [] as $mol_plot_graph[]
			
			for( let graph of graphs ) next.push( ...graph.front() )
			
			return next
		}
		
	}
}
