namespace $ { export class $mol_scroll extends $mol_view {

	/**
	 *  ```
	 *  minimal_height 0
	 *  ```
	 **/
	minimal_height() {
		return 0
	}

	/**
	 *  ```
	 *  _event_scroll_timer?val null
	 *  ```
	 **/
	@ $mol_mem
	_event_scroll_timer( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  field *
	 *  	^
	 *  	scrollTop <= scroll_top?val
	 *  	scrollLeft <= scroll_left?val
	 *  ```
	 **/
	field() {
		return ({
			...super.field() ,
			"scrollTop" :  this.scroll_top() ,
			"scrollLeft" :  this.scroll_left() ,
		})
	}

	/**
	 *  ```
	 *  scroll_top?val 0
	 *  ```
	 **/
	@ $mol_mem
	scroll_top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  scroll_left?val 0
	 *  ```
	 **/
	@ $mol_mem
	scroll_left( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	scroll?event <=> event_scroll?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"scroll" :  ( event? : any )=>  this.event_scroll( event ) ,
		})
	}

	/**
	 *  ```
	 *  event_scroll?event null
	 *  ```
	 **/
	@ $mol_mem
	event_scroll( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }
