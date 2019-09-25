namespace $ { export class $mol_plot_line extends $mol_plot_graph {

	/**
	 *  ```
	 *  threshold 4
	 *  ```
	 **/
	threshold() {
		return 4
	}

	/**
	 *  ```
	 *  spacing 2
	 *  ```
	 **/
	spacing() {
		return 2
	}

	/**
	 *  ```
	 *  color_fill \none
	 *  ```
	 **/
	color_fill() {
		return "none"
	}

	/**
	 *  ```
	 *  sub / <= Curve
	 *  ```
	 **/
	sub() {
		return [].concat( this.Curve() )
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
	 *  Sample $mol_plot_graph_sample
	 *  	color <= color
	 *  	type <= type
	 *  ```
	 **/
	@ $mol_mem
	Sample() {
		return (( obj )=>{
			obj.color = () => this.color()
			obj.type = () => this.type()
			return obj
		})( new this.$.$mol_plot_graph_sample(  ) )
	}

} }

