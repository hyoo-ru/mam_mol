namespace $ { export class $mol_plot_mark_cross extends $mol_plot_graph {

	/**
	 *  ```
	 *  labels /string
	 *  ```
	 **/
	labels() {
		return [  ] as readonly ( string )[]
	}

	/**
	 *  ```
	 *  title_x_gap 4
	 *  ```
	 **/
	title_x_gap() {
		return 4
	}

	/**
	 *  ```
	 *  threshold 16
	 *  ```
	 **/
	threshold() {
		return 16
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
	 *  dimensions $mol_vector_2d /
	 *  	<= dimensions_x
	 *  	<= dimensions_y
	 *  ```
	 **/
	@ $mol_mem
	dimensions() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( this.dimensions_x() , this.dimensions_y() ) )
	}

	/**
	 *  ```
	 *  dimensions_x $mol_vector_range /
	 *  	Infinity
	 *  	-Infinity
	 *  ```
	 **/
	@ $mol_mem
	dimensions_x() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) )
	}

	/**
	 *  ```
	 *  dimensions_y $mol_vector_range /
	 *  	Infinity
	 *  	-Infinity
	 *  ```
	 **/
	@ $mol_mem
	dimensions_y() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Curve
	 *  	<= Label_x
	 *  	<= Label_y
	 *  ```
	 **/
	sub() {
		return [ this.Curve() , this.Label_x() , this.Label_y() ] as readonly any[]
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
	 *  Label_x $mol_svg_text_box
	 *  	pos_x <= title_x_pos_x
	 *  	pos_y <= title_x_pos_y
	 *  	text <= title_x
	 *  ```
	 **/
	@ $mol_mem
	Label_x() {
		return (( obj )=>{
			obj.pos_x = () => this.title_x_pos_x()
			obj.pos_y = () => this.title_x_pos_y()
			obj.text = () => this.title_x()
			return obj
		})( new this.$.$mol_svg_text_box(  ) )
	}

	/**
	 *  ```
	 *  title_x_pos_x \0
	 *  ```
	 **/
	title_x_pos_x() {
		return "0"
	}

	/**
	 *  ```
	 *  title_x_pos_y \100%
	 *  ```
	 **/
	title_x_pos_y() {
		return "100%"
	}

	/**
	 *  ```
	 *  title_x \
	 *  ```
	 **/
	title_x() {
		return ""
	}

	/**
	 *  ```
	 *  Label_y $mol_svg_text_box
	 *  	pos_x <= title_y_pos_x
	 *  	pos_y <= title_y_pos_y
	 *  	text <= title_y
	 *  ```
	 **/
	@ $mol_mem
	Label_y() {
		return (( obj )=>{
			obj.pos_x = () => this.title_y_pos_x()
			obj.pos_y = () => this.title_y_pos_y()
			obj.text = () => this.title_y()
			return obj
		})( new this.$.$mol_svg_text_box(  ) )
	}

	/**
	 *  ```
	 *  title_y_pos_x \0
	 *  ```
	 **/
	title_y_pos_x() {
		return "0"
	}

	/**
	 *  ```
	 *  title_y_pos_y \0
	 *  ```
	 **/
	title_y_pos_y() {
		return "0"
	}

	/**
	 *  ```
	 *  title_y \
	 *  ```
	 **/
	title_y() {
		return ""
	}

} }

