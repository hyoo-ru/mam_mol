namespace $ { export class $mol_touch extends $mol_plugin {

	/**
	 *  ```
	 *  start_zoom?val 0
	 *  ```
	 **/
	@ $mol_mem
	start_zoom( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  start_distance?val 0
	 *  ```
	 **/
	@ $mol_mem
	start_distance( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  zoom?val 1
	 *  ```
	 **/
	@ $mol_mem
	zoom( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 1
	}

	/**
	 *  ```
	 *  start_pan?val /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	start_pan( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [0 , 0] as readonly any[]
	}

	/**
	 *  ```
	 *  pan?val /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	pan( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [0 , 0] as readonly any[]
	}

	/**
	 *  ```
	 *  pos?val /
	 *  	NaN
	 *  	NaN
	 *  ```
	 **/
	@ $mol_mem
	pos( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [NaN , NaN] as readonly any[]
	}

	/**
	 *  ```
	 *  start_pos?val null
	 *  ```
	 **/
	@ $mol_mem
	start_pos( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_precision 16
	 *  ```
	 **/
	swipe_precision() {
		return 16
	}

	/**
	 *  ```
	 *  swipe_right?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_right( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_bottom?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_bottom( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_left?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_left( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_top?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_from_right?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_from_right( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_from_bottom?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_from_bottom( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_from_left?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_from_left( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_from_top?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_from_top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_to_right?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_to_right( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_to_bottom?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_to_bottom( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_to_left?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_to_left( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  swipe_to_top?val null
	 *  ```
	 **/
	@ $mol_mem
	swipe_to_top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	touch-action \none
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"touch-action" :  "none" ,
		})
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	touchstart?event <=> event_start?event
	 *  	touchmove?event <=> event_move?event
	 *  	touchend?event <=> event_end?event
	 *  	mousedown?event <=> event_start?event
	 *  	mousemove?event <=> event_move?event
	 *  	mouseup?event <=> event_end?event
	 *  	mouseleave?event <=> event_leave?event
	 *  	wheel?event <=> event_wheel?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"touchstart" :  ( event? : any )=>  this.event_start( event ) ,
			"touchmove" :  ( event? : any )=>  this.event_move( event ) ,
			"touchend" :  ( event? : any )=>  this.event_end( event ) ,
			"mousedown" :  ( event? : any )=>  this.event_start( event ) ,
			"mousemove" :  ( event? : any )=>  this.event_move( event ) ,
			"mouseup" :  ( event? : any )=>  this.event_end( event ) ,
			"mouseleave" :  ( event? : any )=>  this.event_leave( event ) ,
			"wheel" :  ( event? : any )=>  this.event_wheel( event ) ,
		})
	}

	/**
	 *  ```
	 *  event_start?event null
	 *  ```
	 **/
	@ $mol_mem
	event_start( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_move?event null
	 *  ```
	 **/
	@ $mol_mem
	event_move( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_end?event null
	 *  ```
	 **/
	@ $mol_mem
	event_end( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_leave?event null
	 *  ```
	 **/
	@ $mol_mem
	event_leave( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_wheel?event null
	 *  ```
	 **/
	@ $mol_mem
	event_wheel( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/touch/-view.tree/touch.view.tree.map