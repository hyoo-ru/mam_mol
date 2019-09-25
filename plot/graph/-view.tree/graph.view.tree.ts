namespace $ { export class $mol_plot_graph extends $mol_svg_group {

	/**
	 *  ```
	 *  series_x /number
	 *  ```
	 **/
	series_x() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  series_y /number
	 *  ```
	 **/
	series_y() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_plot_graph_type <= type
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_plot_graph_type" :  this.type() ,
		})
	}

	/**
	 *  ```
	 *  type \solid
	 *  ```
	 **/
	type() {
		return "solid"
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	color <= color
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"color" :  this.color() ,
		})
	}

	/**
	 *  ```
	 *  color \
	 *  ```
	 **/
	color() {
		return ""
	}

	/**
	 *  ```
	 *  viewport $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  ```
	 **/
	@ $mol_mem
	viewport() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) ) , (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) ) ) )
	}

	/**
	 *  ```
	 *  shift /number
	 *  	0
	 *  	0
	 *  ```
	 **/
	shift() {
		return [].concat( 0 , 0 ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  scale /number
	 *  	1
	 *  	1
	 *  ```
	 **/
	scale() {
		return [].concat( 1 , 1 ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  cursor_position $mol_vector_2d /
	 *  	NaN
	 *  	NaN
	 *  ```
	 **/
	@ $mol_mem
	cursor_position() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( NaN , NaN ) )
	}

	/**
	 *  ```
	 *  dimensions_pane $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  ```
	 **/
	@ $mol_mem
	dimensions_pane() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) ) , (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) ) ) )
	}

	/**
	 *  ```
	 *  dimensions $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  ```
	 **/
	@ $mol_mem
	dimensions() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) ) , (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( Infinity , -Infinity ) ) ) )
	}

	/**
	 *  ```
	 *  size_real $mol_vector_2d /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	size_real() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( 0 , 0 ) )
	}

	/**
	 *  ```
	 *  gap $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		0
	 *  		0
	 *  	$mol_vector_range /
	 *  		0
	 *  		0
	 *  ```
	 **/
	@ $mol_mem
	gap() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( 0 , 0 ) ) , (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( 0 , 0 ) ) ) )
	}

	/**
	 *  ```
	 *  indexes /number
	 *  ```
	 **/
	indexes() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  points /readonly[number,number]
	 *  ```
	 **/
	points() {
		return [].concat(  ) as readonly ( readonly[number,number] )[]
	}

	/**
	 *  ```
	 *  front /$mol_svg
	 *  ```
	 **/
	front() {
		return [].concat(  ) as readonly ( $mol_svg )[]
	}

	/**
	 *  ```
	 *  back /$mol_svg
	 *  ```
	 **/
	back() {
		return [].concat(  ) as readonly ( $mol_svg )[]
	}

	/**
	 *  ```
	 *  hue NaN
	 *  ```
	 **/
	hue() {
		return NaN
	}

	/**
	 *  ```
	 *  Sample null
	 *  ```
	 **/
	Sample() {
		return null as any
	}

} }

namespace $ { export class $mol_plot_graph_sample extends $mol_view {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_plot_graph_type <= type
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_plot_graph_type" :  this.type() ,
		})
	}

	/**
	 *  ```
	 *  type \solid
	 *  ```
	 **/
	type() {
		return "solid"
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	color <= color
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"color" :  this.color() ,
		})
	}

	/**
	 *  ```
	 *  color \black
	 *  ```
	 **/
	color() {
		return "black"
	}

} }

