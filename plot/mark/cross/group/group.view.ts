namespace $.$$ {
	export class $mol_plot_mark_cross_group extends $.$mol_plot_mark_cross_group {
		@ $mol_mem
		graphs_enriched() {
			const graphs = this.graphs()
			for( let graph of graphs ) {
				graph.shift = ()=> this.shift()
				graph.scale = ()=> this.scale()
				graph.size_real = ()=> this.size_real()
				graph.hue = ()=> this.hue()
				graph.dimensions_pane = ()=> this.dimensions_pane()
				graph.viewport = ()=> this.viewport()
				graph.cursor_position = ()=> this.cursor_position()
			}
			return graphs
		}

		@$mol_mem
		filtered(): $.$mol_plot_mark_cross | null {
			const graphs = this.graphs_enriched()
			let filtered = null
			let delta = Number.POSITIVE_INFINITY
			for (let graph of graphs) {
				const diff = graph.nearest_delta()
				if (diff > delta) continue
				filtered = graph
				delta = diff
			}

			return filtered
		}

		back() {
			const graph = this.filtered()
			return graph ? graph.back() : []
		}
		
		front() {
			const graph = this.filtered()
			return graph ? graph.front() : []
		}
	}
}
