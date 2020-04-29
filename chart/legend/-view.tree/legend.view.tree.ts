namespace $ { export class $mol_chart_legend extends $mol_scroll {

	/**
	 *  ```
	 *  graphs /$mol_plot_graph
	 *  ```
	 **/
	graphs() {
		return [] as readonly ( $mol_plot_graph )[]
	}

	/**
	 *  ```
	 *  sub <= graph_legends
	 *  ```
	 **/
	sub() {
		return this.graph_legends()
	}

	/**
	 *  ```
	 *  graph_legends /$mol_view
	 *  ```
	 **/
	graph_legends() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Graph_legend!id $mol_view sub /
	 *  	<= Graph_sample_box!id
	 *  	<= Graph_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Graph_legend( id : any ) {
		return (( obj )=>{
			obj.sub = () => [this.Graph_sample_box(id) , this.Graph_title(id)] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Graph_sample_box!id $mol_view sub / <= Graph_sample!id
	 *  ```
	 **/
	@ $mol_mem_key
	Graph_sample_box( id : any ) {
		return (( obj )=>{
			obj.sub = () => [this.Graph_sample(id)] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Graph_sample!id null
	 *  ```
	 **/
	Graph_sample( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  Graph_title!id $mol_view sub / <= graph_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Graph_title( id : any ) {
		return (( obj )=>{
			obj.sub = () => [this.graph_title(id)] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  graph_title!id \
	 *  ```
	 **/
	graph_title( id : any ) {
		return ""
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/chart/legend/-view.tree/legend.view.tree.map