namespace $ { export class $mol_chart_demo_forces extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Fake wheel forces
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_forces_title" )
	}

	/**
	 *  ```
	 *  samples_count 10000
	 *  ```
	 **/
	samples_count() {
		return 10000
	}

	/**
	 *  ```
	 *  points_max 600
	 *  ```
	 **/
	points_max() {
		return 600
	}

	/**
	 *  ```
	 *  sub / <= Chart
	 *  ```
	 **/
	sub() {
		return [].concat( this.Chart() )
	}

	/**
	 *  ```
	 *  Chart $mol_chart graphs /
	 *  	<= Forces_left
	 *  	<= Forces_right
	 *  	<= Vert_ruler
	 *  	<= Hor_ruler
	 *  	<= Cross
	 *  ```
	 **/
	@ $mol_mem
	Chart() {
		return (( obj )=>{
			obj.graphs = () => [].concat( this.Forces_left() , this.Forces_right() , this.Vert_ruler() , this.Hor_ruler() , this.Cross() )
			return obj
		})( new this.$.$mol_chart(  ) )
	}

	/**
	 *  ```
	 *  Forces_left $mol_plot_dot
	 *  	title <= forces_left_title
	 *  	series_x <= forces_left_x
	 *  	series_y <= forces_left_y
	 *  	points_max <= points_max
	 *  ```
	 **/
	@ $mol_mem
	Forces_left() {
		return (( obj )=>{
			obj.title = () => this.forces_left_title()
			obj.series_x = () => this.forces_left_x()
			obj.series_y = () => this.forces_left_y()
			obj.points_max = () => this.points_max()
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  forces_left_title @ \Left wheel
	 *  ```
	 **/
	forces_left_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_forces_forces_left_title" )
	}

	/**
	 *  ```
	 *  forces_left_x /number
	 *  ```
	 **/
	forces_left_x() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  forces_left_y /number
	 *  ```
	 **/
	forces_left_y() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  Forces_right $mol_plot_dot
	 *  	title <= forces_right_title
	 *  	series_x <= forces_right_x
	 *  	series_y <= forces_right_y
	 *  	points_max <= points_max
	 *  ```
	 **/
	@ $mol_mem
	Forces_right() {
		return (( obj )=>{
			obj.title = () => this.forces_right_title()
			obj.series_x = () => this.forces_right_x()
			obj.series_y = () => this.forces_right_y()
			obj.points_max = () => this.points_max()
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  forces_right_title @ \Right wheel
	 *  ```
	 **/
	forces_right_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_forces_forces_right_title" )
	}

	/**
	 *  ```
	 *  forces_right_x /number
	 *  ```
	 **/
	forces_right_x() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  forces_right_y /number
	 *  ```
	 **/
	forces_right_y() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  Vert_ruler $mol_plot_ruler_vert title <= vert_title
	 *  ```
	 **/
	@ $mol_mem
	Vert_ruler() {
		return (( obj )=>{
			obj.title = () => this.vert_title()
			return obj
		})( new this.$.$mol_plot_ruler_vert(  ) )
	}

	/**
	 *  ```
	 *  vert_title @ \kN
	 *  ```
	 **/
	vert_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_forces_vert_title" )
	}

	/**
	 *  ```
	 *  Hor_ruler $mol_plot_ruler_hor
	 *  	title <= hor_title
	 *  	series_x <= forces_left_x
	 *  ```
	 **/
	@ $mol_mem
	Hor_ruler() {
		return (( obj )=>{
			obj.title = () => this.hor_title()
			obj.series_x = () => this.forces_left_x()
			return obj
		})( new this.$.$mol_plot_ruler_hor(  ) )
	}

	/**
	 *  ```
	 *  hor_title @ \cm
	 *  ```
	 **/
	hor_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_forces_hor_title" )
	}

	/**
	 *  ```
	 *  Cross $mol_plot_mark_cross graphs /
	 *  	<= Forces_left
	 *  	<= Forces_right
	 *  ```
	 **/
	@ $mol_mem
	Cross() {
		return (( obj )=>{
			obj.graphs = () => [].concat( this.Forces_left() , this.Forces_right() )
			return obj
		})( new this.$.$mol_plot_mark_cross(  ) )
	}

} }

