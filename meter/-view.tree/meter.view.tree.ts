namespace $ { export class $mol_meter extends $mol_plugin {

	/**
	 *  ```
	 *  zoom 1
	 *  ```
	 **/
	zoom() {
		return 1
	}

	/**
	 *  ```
	 *  width?val 0
	 *  ```
	 **/
	@ $mol_mem
	width( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  height?val 0
	 *  ```
	 **/
	@ $mol_mem
	height( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  left?val 0
	 *  ```
	 **/
	@ $mol_mem
	left( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  right?val 0
	 *  ```
	 **/
	@ $mol_mem
	right( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  bottom?val 0
	 *  ```
	 **/
	@ $mol_mem
	bottom( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  top?val 0
	 *  ```
	 **/
	@ $mol_mem
	top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

} }

