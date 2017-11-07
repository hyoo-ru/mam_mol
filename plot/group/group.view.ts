namespace $.$$ {
	export class $mol_plot_group extends $.$mol_plot_group {
		
		@ $mol_mem
		graphs_enriched() {
			const graphs = this.graphs()
			for( let graph of graphs ) {
				graph.hue = ()=> this.hue()
				graph.points = ()=> this.points()
				graph.shift = ()=> this.shift()
				graph.scale = ()=> this.scale()
				graph.size_real = ()=> this.size_real()
				graph.dimensions_expanded = ()=> this.dimensions_expanded()
			}
			return graphs
		}
		
		@ $mol_mem
		graph_samples() {
			return this.graphs().map( graph => graph.Sample() )
		}
		
		back() {
			const graphs = this.graphs_enriched()
			const next = [] as $mol_view[]
			
			for( let graph of graphs ) next.push( ...graph.back() )
			
			return next
		}
		
		front() {
			const graphs = this.graphs_enriched()
			const next = [] as $mol_view[]
			
			for( let graph of graphs ) next.push( ...graph.front() )
			
			return next
		}
		
	}
}
