namespace $ { export class $mol_chart extends $mol_view {

	/**
	 *  ```
	 *  gap_hor 48
	 *  ```
	 **/
	gap_hor() {
		return 48
	}

	/**
	 *  ```
	 *  gap_vert 24
	 *  ```
	 **/
	gap_vert() {
		return 24
	}

	/**
	 *  ```
	 *  gap_left <= gap_hor
	 *  ```
	 **/
	gap_left() {
		return this.gap_hor()
	}

	/**
	 *  ```
	 *  gap_right <= gap_hor
	 *  ```
	 **/
	gap_right() {
		return this.gap_hor()
	}

	/**
	 *  ```
	 *  gap_bottom <= gap_vert
	 *  ```
	 **/
	gap_bottom() {
		return this.gap_vert()
	}

	/**
	 *  ```
	 *  gap_top <= gap_vert
	 *  ```
	 **/
	gap_top() {
		return this.gap_vert()
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
	 *  sub /
	 *  	<= Legend
	 *  	<= Plot
	 *  ```
	 **/
	sub() {
		return [ this.Legend() , this.Plot() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Legend $mol_chart_legend graphs <= graphs_colored
	 *  ```
	 **/
	@ $mol_mem
	Legend() {
		return (( obj )=>{
			obj.graphs = () => this.graphs_colored()
			return obj
		})( new this.$.$mol_chart_legend(  ) )
	}

	graphs_colored() {
		return this.Plot().graphs_colored(  )
	}

	/**
	 *  ```
	 *  Plot $mol_plot_pane
	 *  	gap_left <= gap_left
	 *  	gap_right <= gap_right
	 *  	gap_bottom <= gap_bottom
	 *  	gap_top <= gap_top
	 *  	graphs <= graphs
	 *  	graphs_colored => graphs_colored
	 *  	hue_base?val <= hue_base
	 *  	hue_shift?val <= hue_shift
	 *  ```
	 **/
	@ $mol_mem
	Plot() {
		return (( obj )=>{
			obj.gap_left = () => this.gap_left()
			obj.gap_right = () => this.gap_right()
			obj.gap_bottom = () => this.gap_bottom()
			obj.gap_top = () => this.gap_top()
			obj.graphs = () => this.graphs()
			obj.hue_base = ( val? : any ) => this.hue_base()
			obj.hue_shift = ( val? : any ) => this.hue_shift()
			return obj
		})( new this.$.$mol_plot_pane(  ) )
	}

	/**
	 *  ```
	 *  hue_base 140
	 *  ```
	 **/
	hue_base() {
		return 140
	}

	/**
	 *  ```
	 *  hue_shift 111
	 *  ```
	 **/
	hue_shift() {
		return 111
	}

} }

