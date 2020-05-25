namespace $ { export class $mol_hotkey extends $mol_plugin {

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	keydown?event <=> keydown?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"keydown" :  ( event? : any )=>  this.keydown( event ) ,
		})
	}

	/**
	 *  ```
	 *  keydown?event null
	 *  ```
	 **/
	@ $mol_mem
	keydown( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  key *
	 *  ```
	 **/
	key() {
		return ({
		})
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
	 *  mod_alt false
	 *  ```
	 **/
	mod_alt() {
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

} }
