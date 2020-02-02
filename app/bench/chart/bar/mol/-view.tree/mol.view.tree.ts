namespace $ { export class $mol_app_bench_chart_bar_mol extends $mol_view {

	/**
	 *  ```
	 *  sub / <= Chart
	 *  ```
	 **/
	sub() {
		return [ this.Chart() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Chart $mol_chart graphs <= graphs
	 *  ```
	 **/
	@ $mol_mem
	Chart() {
		return (( obj )=>{
			obj.graphs = () => this.graphs()
			return obj
		})( new this.$.$mol_chart(  ) )
	}

	/**
	 *  ```
	 *  graphs /$mol_plot_graph
	 *  	<= Vert
	 *  	<= Hor
	 *  ```
	 **/
	graphs() {
		return [ this.Vert() , this.Hor() ] as readonly ( $mol_plot_graph )[]
	}

	/**
	 *  ```
	 *  Vert $mol_plot_ruler_vert title \Val
	 *  ```
	 **/
	@ $mol_mem
	Vert() {
		return (( obj )=>{
			obj.title = () => "Val"
			return obj
		})( new this.$.$mol_plot_ruler_vert(  ) )
	}

	/**
	 *  ```
	 *  Hor $mol_plot_mark_hor
	 *  	title \Iter
	 *  	series_x <= hor_series
	 *  ```
	 **/
	@ $mol_mem
	Hor() {
		return (( obj )=>{
			obj.title = () => "Iter"
			obj.series_x = () => this.hor_series()
			return obj
		})( new this.$.$mol_plot_mark_hor(  ) )
	}

	/**
	 *  ```
	 *  hor_series /number
	 *  ```
	 **/
	hor_series() {
		return [  ] as readonly ( number )[]
	}

	/**
	 *  ```
	 *  Graph!id $mol_plot_bar
	 *  	title <= graph_title!id
	 *  	series_y <= series!id
	 *  ```
	 **/
	@ $mol_mem_key
	Graph( id : any ) {
		return (( obj )=>{
			obj.title = () => this.graph_title(id)
			obj.series_y = () => this.series(id)
			return obj
		})( new this.$.$mol_plot_bar(  ) )
	}

	/**
	 *  ```
	 *  graph_title!id \
	 *  ```
	 **/
	graph_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  series!id /number
	 *  ```
	 **/
	series( id : any ) {
		return [  ] as readonly ( number )[]
	}

} }

