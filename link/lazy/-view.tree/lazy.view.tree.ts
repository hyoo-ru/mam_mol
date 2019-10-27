namespace $ { export class $mol_link_lazy extends $mol_link {

	/**
	 *  ```
	 *  uri?val \
	 *  ```
	 **/
	@ $mol_mem
	uri( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  uri_generated \
	 *  ```
	 **/
	uri_generated() {
		return ""
	}

	/**
	 *  ```
	 *  current false
	 *  ```
	 **/
	current() {
		return false
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	mousedown?event <=> generate?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"mousedown" :  ( event? : any )=>  this.generate( event ) ,
		})
	}

	/**
	 *  ```
	 *  generate?event null
	 *  ```
	 **/
	@ $mol_mem
	generate( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }

