namespace $ { export class $mol_app_life_map extends $mol_plot_pane {

	/**
	 *  ```
	 *  gap_hor 0
	 *  ```
	 **/
	gap_hor() {
		return 0
	}

	/**
	 *  ```
	 *  gap_vert 0
	 *  ```
	 **/
	gap_vert() {
		return 0
	}

	/**
	 *  ```
	 *  pan?val /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	pan( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [].concat( 0 , 0 )
	}

	/**
	 *  ```
	 *  zoom?val 16
	 *  ```
	 **/
	@ $mol_mem
	zoom( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 16
	}

	/**
	 *  ```
	 *  scale /
	 *  	<= zoom
	 *  	<= zoom
	 *  ```
	 **/
	scale() {
		return [].concat( this.zoom() , this.zoom() )
	}

	/**
	 *  ```
	 *  shift <= pan
	 *  ```
	 **/
	shift() {
		return this.pan()
	}

	/**
	 *  ```
	 *  graphs / <= Points
	 *  ```
	 **/
	graphs() {
		return [].concat( this.Points() )
	}

	/**
	 *  ```
	 *  Points $mol_plot_dot
	 *  	diameter <= zoom
	 *  	series_x <= points_x
	 *  	series_y <= points_y
	 *  ```
	 **/
	@ $mol_mem
	Points() {
		return (( obj )=>{
			obj.diameter = () => this.zoom()
			obj.series_x = () => this.points_x()
			obj.series_y = () => this.points_y()
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  points_x /number
	 *  ```
	 **/
	points_x() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  points_y /number
	 *  ```
	 **/
	points_y() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  plugins / <= Touch
	 *  ```
	 **/
	plugins() {
		return [].concat( this.Touch() )
	}

	/**
	 *  ```
	 *  Touch $mol_touch
	 *  	zoom?val <=> zoom?val
	 *  	pan?val <=> pan?val
	 *  ```
	 **/
	@ $mol_mem
	Touch() {
		return (( obj )=>{
			obj.zoom = ( val? : any ) => this.zoom( val )
			obj.pan = ( val? : any ) => this.pan( val )
			return obj
		})( new this.$.$mol_touch(  ) )
	}

	/**
	 *  ```
	 *  snapshot \
	 *  ```
	 **/
	snapshot() {
		return ""
	}

	/**
	 *  ```
	 *  snapshot_current \
	 *  ```
	 **/
	snapshot_current() {
		return ""
	}

	/**
	 *  ```
	 *  speed 0
	 *  ```
	 **/
	speed() {
		return 0
	}

	/**
	 *  ```
	 *  population 0
	 *  ```
	 **/
	population() {
		return 0
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	mousedown?event <=> draw_start?event
	 *  	mouseup?event <=> draw_end?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"mousedown" :  ( event? : any )=>  this.draw_start( event ) ,
			"mouseup" :  ( event? : any )=>  this.draw_end( event ) ,
		})
	}

	/**
	 *  ```
	 *  draw_start?event null
	 *  ```
	 **/
	@ $mol_mem
	draw_start( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  draw_end?event null
	 *  ```
	 **/
	@ $mol_mem
	draw_end( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }

