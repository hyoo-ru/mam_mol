namespace $ { export class $mol_plot_group extends $mol_plot_graph {

	/**
	 *  ```
	 *  sub <= graphs_enriched
	 *  ```
	 **/
	sub() {
		return this.graphs_enriched()
	}

	/**
	 *  ```
	 *  graphs_enriched <= graphs
	 *  ```
	 **/
	graphs_enriched() {
		return this.graphs()
	}

	/**
	 *  ```
	 *  graphs /$mol_plot_graph
	 *  ```
	 **/
	graphs() {
		return [  ] as readonly ( $mol_plot_graph )[]
	}

	/**
	 *  ```
	 *  Sample $mol_plot_graph_sample sub <= graph_samples
	 *  ```
	 **/
	@ $mol_mem
	Sample() {
		return (( obj )=>{
			obj.sub = () => this.graph_samples()
			return obj
		})( new this.$.$mol_plot_graph_sample(  ) )
	}

	/**
	 *  ```
	 *  graph_samples /$mol_view
	 *  ```
	 **/
	graph_samples() {
		return [  ] as readonly ( $mol_view )[]
	}

} }

