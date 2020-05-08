namespace $ { export class $mol_nav extends $mol_plugin {

	/**
	 *  ```
	 *  cycle?val false
	 *  ```
	 **/
	@ $mol_mem
	cycle( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  mod_ctrl false
	 *  ```
	 **/
	mod_ctrl() {
		return false
	}

	/**
	 *  ```
	 *  mod_shift false
	 *  ```
	 **/
	mod_shift() {
		return false
	}

	/**
	 *  ```
	 *  mod_alt false
	 *  ```
	 **/
	mod_alt() {
		return false
	}

	/**
	 *  ```
	 *  keys_x?val /
	 *  ```
	 **/
	@ $mol_mem
	keys_x( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [] as readonly any[]
	}

	/**
	 *  ```
	 *  keys_y?val /
	 *  ```
	 **/
	@ $mol_mem
	keys_y( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [] as readonly any[]
	}

	/**
	 *  ```
	 *  current_x?val \
	 *  ```
	 **/
	@ $mol_mem
	current_x( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  current_y?val \
	 *  ```
	 **/
	@ $mol_mem
	current_y( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  event_up?event null
	 *  ```
	 **/
	@ $mol_mem
	event_up( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_down?event null
	 *  ```
	 **/
	@ $mol_mem
	event_down( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_left?event null
	 *  ```
	 **/
	@ $mol_mem
	event_left( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_right?event null
	 *  ```
	 **/
	@ $mol_mem
	event_right( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	keydown?event <=> event_key?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"keydown" :  ( event? : any )=>  this.event_key( event ) ,
		})
	}

	/**
	 *  ```
	 *  event_key?event null
	 *  ```
	 **/
	@ $mol_mem
	event_key( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }
