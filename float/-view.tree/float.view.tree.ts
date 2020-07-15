namespace $ { export class $mol_float extends $mol_view {

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	minHeight \auto
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"minHeight" :  "auto" ,
		})
	}

} }
