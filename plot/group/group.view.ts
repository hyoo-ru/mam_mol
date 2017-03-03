namespace $.$mol {
	export class $mol_plot_group extends $.$mol_plot_group {
		
		@ $mol_mem()
		graphs_enriched() {
			const graphs = this.graphs()
			for( let graph of graphs ) {
				graph.hue = ()=> this.hue()
				graph.points = ()=> this.points()
				graph.shift = ()=> this.shift()
				graph.scale = ()=> this.scale()
				graph.dimensions_expanded = ()=> this.dimensions_expanded()
			}
			return graphs
		}
		
		@ $mol_mem()
		graph_samples() {
			return this.graphs().map( graph => graph.Sample() )
		}
		
	}
}
