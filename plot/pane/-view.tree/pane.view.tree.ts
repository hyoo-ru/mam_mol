namespace $ { export class $mol_plot_pane extends $mol_svg_root {

	/**
	 *  ```
	 *  aspect \none
	 *  ```
	 **/
	aspect() {
		return "none"
	}

	/**
	 *  ```
	 *  hue_base?val NaN
	 *  ```
	 **/
	@ $mol_mem
	hue_base( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : NaN
	}

	/**
	 *  ```
	 *  hue_shift?val 111
	 *  ```
	 **/
	@ $mol_mem
	hue_shift( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 111
	}

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
	 *  gap_top <= gap_vert
	 *  ```
	 **/
	gap_top() {
		return this.gap_vert()
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
	 *  gap $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		<= gap_left
	 *  		<= gap_right
	 *  	$mol_vector_range /
	 *  		<= gap_bottom
	 *  		<= gap_top
	 *  ```
	 **/
	@ $mol_mem
	gap() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( this.gap_left() , this.gap_right() ) ) , (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( this.gap_bottom() , this.gap_top() ) ) ) )
	}

	/**
	 *  ```
	 *  shift_limit $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		0
	 *  		0
	 *  	$mol_vector_range /
	 *  		0
	 *  		0
	 *  ```
	 **/
	@ $mol_mem
	shift_limit() {
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
	 *  shift_default /number
	 *  	0
	 *  	0
	 *  ```
	 **/
	shift_default() {
		return [].concat( 0 , 0 ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  shift?val /number
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	shift( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [].concat( 0 , 0 ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  scale_limit $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		0
	 *  		Infinity
	 *  	$mol_vector_range /
	 *  		0
	 *  		Infinity
	 *  ```
	 **/
	@ $mol_mem
	scale_limit() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( 0 , Infinity ) ) , (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( 0 , Infinity ) ) ) )
	}

	/**
	 *  ```
	 *  scale_default /number
	 *  	0
	 *  	0
	 *  ```
	 **/
	scale_default() {
		return [].concat( 0 , 0 ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  scale?val /number
	 *  	1
	 *  	1
	 *  ```
	 **/
	@ $mol_mem
	scale( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [].concat( 1 , 1 ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  scale_x?val 0
	 *  ```
	 **/
	@ $mol_mem
	scale_x( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  scale_y?val 0
	 *  ```
	 **/
	@ $mol_mem
	scale_y( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  size $mol_vector_2d /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	size() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( 0 , 0 ) )
	}

	/**
	 *  ```
	 *  size_real $mol_vector_2d /
	 *  	1
	 *  	1
	 *  ```
	 **/
	@ $mol_mem
	size_real() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( 1 , 1 ) )
	}

	/**
	 *  ```
	 *  dimensions_viewport $mol_vector_2d /
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  	$mol_vector_range /
	 *  		Infinity
	 *  		-Infinity
	 *  ```
	 **/
	@ $mol_mem
	dimensions_viewport() {
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
	 *  sub <= graphs_sorted
	 *  ```
	 **/
	sub() {
		return this.graphs_sorted()
	}

	/**
	 *  ```
	 *  graphs_sorted /$mol_svg
	 *  ```
	 **/
	graphs_sorted() {
		return [].concat(  ) as readonly ( $mol_svg )[]
	}

	/**
	 *  ```
	 *  graphs_colored <= graphs_positioned
	 *  ```
	 **/
	graphs_colored() {
		return this.graphs_positioned()
	}

	/**
	 *  ```
	 *  graphs_positioned <= graphs
	 *  ```
	 **/
	graphs_positioned() {
		return this.graphs()
	}

	/**
	 *  ```
	 *  graphs /$mol_plot_graph
	 *  ```
	 **/
	graphs() {
		return [].concat(  ) as readonly ( $mol_plot_graph )[]
	}

	/**
	 *  ```
	 *  cursor_position?val $mol_vector_2d /
	 *  	NaN
	 *  	NaN
	 *  ```
	 **/
	@ $mol_mem
	cursor_position( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( NaN , NaN ) )
	}

	/**
	 *  ```
	 *  plugins /
	 *  	<= Meter
	 *  	<= Touch
	 *  ```
	 **/
	plugins() {
		return [].concat( this.Meter() , this.Touch() )
	}

	width() {
		return this.Meter().width(  )
	}

	height() {
		return this.Meter().height(  )
	}

	/**
	 *  ```
	 *  Meter $mol_meter
	 *  	width => width
	 *  	height => height
	 *  ```
	 **/
	@ $mol_mem
	Meter() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_meter(  ) )
	}

	/**
	 *  ```
	 *  Touch $mol_touch
	 *  	zoom?val <=> scale_x?val
	 *  	pan?val <=> shift?val
	 *  	pos?val <=> cursor_position?val
	 *  ```
	 **/
	@ $mol_mem
	Touch() {
		return (( obj )=>{
			obj.zoom = ( val? : any ) => this.scale_x( val )
			obj.pan = ( val? : any ) => this.shift( val )
			obj.pos = ( val? : any ) => this.cursor_position( val )
			return obj
		})( new this.$.$mol_touch(  ) )
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	dblclick?event <=> reset?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"dblclick" :  ( event? : any )=>  this.reset( event ) ,
		})
	}

	/**
	 *  ```
	 *  reset?event null
	 *  ```
	 **/
	@ $mol_mem
	reset( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }

