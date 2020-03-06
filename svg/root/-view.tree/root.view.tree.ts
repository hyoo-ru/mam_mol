namespace $ { export class $mol_svg_root extends $mol_svg {

	/**
	 *  ```
	 *  dom_name \svg
	 *  ```
	 **/
	dom_name() {
		return "svg"
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	viewBox <= view_box
	 *  	preserveAspectRatio <= aspect
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"viewBox" :  this.view_box() ,
			"preserveAspectRatio" :  this.aspect() ,
		})
	}

	/**
	 *  ```
	 *  view_box \0 0 100 100
	 *  ```
	 **/
	view_box() {
		return "0 0 100 100"
	}

	/**
	 *  ```
	 *  aspect \xMidYMid
	 *  ```
	 **/
	aspect() {
		return "xMidYMid"
	}

} }

