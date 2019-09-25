namespace $ { export class $mol_map_yandex extends $mol_view {

	/**
	 *  ```
	 *  zoom?val 2
	 *  ```
	 **/
	@ $mol_mem
	zoom( val? : any , force? : $mol_atom_force ) {
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
	center( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [].concat( 0 , 0 )
	}

	/**
	 *  ```
	 *  objects /
	 *  ```
	 **/
	objects() {
		return [].concat(  )
	}

} }

