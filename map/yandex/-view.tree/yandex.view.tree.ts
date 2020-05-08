namespace $ { export class $mol_map_yandex extends $mol_view {

	/**
	 *  ```
	 *  zoom?val 2
	 *  ```
	 **/
	@ $mol_mem
	zoom( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 2
	}

	/**
	 *  ```
	 *  center?val /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	center( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [0 , 0] as readonly any[]
	}

	/**
	 *  ```
	 *  objects /
	 *  ```
	 **/
	objects() {
		return [] as readonly any[]
	}

} }
