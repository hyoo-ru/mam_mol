namespace $ { export class $mol_plot_ruler extends $mol_plot_graph {

	/**
	 *  ```
	 *  step 0
	 *  ```
	 **/
	step() {
		return 0
	}

	/**
	 *  ```
	 *  scale_axis 1
	 *  ```
	 **/
	scale_axis() {
		return 1
	}

	/**
	 *  ```
	 *  scale_step 1
	 *  ```
	 **/
	scale_step() {
		return 1
	}

	/**
	 *  ```
	 *  shift_axis 1
	 *  ```
	 **/
	shift_axis() {
		return 1
	}

	/**
	 *  ```
	 *  dimensions_axis $mol_vector_range /
	 *  	Infinity
	 *  	-Infinity
	 *  ```
	 **/
	@ $mol_mem
	dimensions_axis() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) )
	}

	/**
	 *  ```
	 *  viewport_axis $mol_vector_range /
	 *  	Infinity
	 *  	-Infinity
	 *  ```
	 **/
	@ $mol_mem
	viewport_axis() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) )
	}

	/**
	 *  ```
	 *  axis_points /number
	 *  ```
	 **/
	axis_points() {
		return [  ] as readonly ( number )[]
	}

	/**
	 *  ```
	 *  normalize?val 0
	 *  ```
	 **/
	@ $mol_mem
	normalize( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  precision 1
	 *  ```
	 **/
	precision() {
		return 1
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Background
	 *  	<= Curve
	 *  	<= labels_formatted
	 *  	<= Title
	 *  ```
	 **/
	sub() {
		return [ this.Background() , this.Curve() , this.labels_formatted() , this.Title() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Background $mol_svg_rect
	 *  	pos_x <= background_x
	 *  	pos_y <= background_y
	 *  	width <= background_width
	 *  	height <= background_height
	 *  ```
	 **/
	@ $mol_mem
	Background() {
		return (( obj )=>{
			obj.pos_x = () => this.background_x()
			obj.pos_y = () => this.background_y()
			obj.width = () => this.background_width()
			obj.height = () => this.background_height()
			return obj
		})( new this.$.$mol_svg_rect(  ) )
	}

	/**
	 *  ```
	 *  background_x \0
	 *  ```
	 **/
	background_x() {
		return "0"
	}

	/**
	 *  ```
	 *  background_y \0
	 *  ```
	 **/
	background_y() {
		return "0"
	}

	/**
	 *  ```
	 *  background_width \100%
	 *  ```
	 **/
	background_width() {
		return "100%"
	}

	/**
	 *  ```
	 *  background_height \14
	 *  ```
	 **/
	background_height() {
		return "14"
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
	 *  labels_formatted /
	 *  ```
	 **/
	labels_formatted() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Title $mol_svg_text_box
	 *  	pos_x <= title_pos_x
	 *  	pos_y <= title_pos_y
	 *  	align <= title_align
	 *  	text <= title
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.pos_x = () => this.title_pos_x()
			obj.pos_y = () => this.title_pos_y()
			obj.align = () => this.title_align()
			obj.text = () => this.title()
			return obj
		})( new this.$.$mol_svg_text_box(  ) )
	}

	/**
	 *  ```
	 *  title_pos_x \0
	 *  ```
	 **/
	title_pos_x() {
		return "0"
	}

	/**
	 *  ```
	 *  title_pos_y \100%
	 *  ```
	 **/
	title_pos_y() {
		return "100%"
	}

	/**
	 *  ```
	 *  title_align \start
	 *  ```
	 **/
	title_align() {
		return "start"
	}

	/**
	 *  ```
	 *  Label!index $mol_svg_text
	 *  	pos <= label_pos!index
	 *  	text <= label_text!index
	 *  	align <= label_align
	 *  ```
	 **/
	@ $mol_mem_key
	Label( index : any ) {
		return (( obj )=>{
			obj.pos = () => this.label_pos(index)
			obj.text = () => this.label_text(index)
			obj.align = () => this.label_align()
			return obj
		})( new this.$.$mol_svg_text(  ) )
	}

	/**
	 *  ```
	 *  label_pos!index /
	 *  	<= label_pos_x!index
	 *  	<= label_pos_y!index
	 *  ```
	 **/
	label_pos( index : any ) {
		return [ this.label_pos_x(index) , this.label_pos_y(index) ] as readonly any[]
	}

	/**
	 *  ```
	 *  label_pos_x!index \
	 *  ```
	 **/
	label_pos_x( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  label_pos_y!index \
	 *  ```
	 **/
	label_pos_y( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  label_text!index \
	 *  ```
	 **/
	label_text( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  label_align \
	 *  ```
	 **/
	label_align() {
		return ""
	}

} }

