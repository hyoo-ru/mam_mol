namespace $ { export class $mol_plot_bar extends $mol_plot_graph {

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	stroke-width <= stroke_width
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"stroke-width" :  this.stroke_width() ,
		})
	}

	/**
	 *  ```
	 *  stroke_width \1rem
	 *  ```
	 **/
	stroke_width() {
		return "1rem"
	}

	/**
	 *  ```
	 *  sub / <= Curve
	 *  ```
	 **/
	sub() {
		return [this.Curve()] as readonly any[]
	}

	/**
	 *  ```
	 *  Curve $mol_svg_path geometry <= curve
	 *  ```
	 **/
	@ $mol_mem
	Curve() {
		return (( obj )=>{
			obj.geometry = () => this.curve()
			return obj
		})( new this.$.$mol_svg_path(  ) )
	}

	/**
	 *  ```
	 *  curve \
	 *  ```
	 **/
	curve() {
		return ""
	}

	/**
	 *  ```
	 *  Sample $mol_plot_graph_sample color <= color
	 *  ```
	 **/
	@ $mol_mem
	Sample() {
		return (( obj )=>{
			obj.color = () => this.color()
			return obj
		})( new this.$.$mol_plot_graph_sample(  ) )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/plot/bar/-view.tree/bar.view.tree.map