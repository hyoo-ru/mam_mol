namespace $ { export class $mol_svg_path extends $mol_svg {

	/**
	 *  ```
	 *  dom_name \path
	 *  ```
	 **/
	dom_name() {
		return "path"
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	d <= geometry
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"d" :  this.geometry() ,
		})
	}

	/**
	 *  ```
	 *  geometry \
	 *  ```
	 **/
	geometry() {
		return ""
	}

} }
