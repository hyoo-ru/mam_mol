namespace $ { export class $mol_svg_rect extends $mol_svg {

	/**
	 *  ```
	 *  dom_name \rect
	 *  ```
	 **/
	dom_name() {
		return "rect"
	}

	/**
	 *  ```
	 *  pos /
	 *  ```
	 **/
	pos() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	width <= width
	 *  	height <= height
	 *  	x <= pos_x
	 *  	y <= pos_y
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"width" :  this.width() ,
			"height" :  this.height() ,
			"x" :  this.pos_x() ,
			"y" :  this.pos_y() ,
		})
	}

	/**
	 *  ```
	 *  width \0
	 *  ```
	 **/
	width() {
		return "0"
	}

	/**
	 *  ```
	 *  height \0
	 *  ```
	 **/
	height() {
		return "0"
	}

	/**
	 *  ```
	 *  pos_x \
	 *  ```
	 **/
	pos_x() {
		return ""
	}

	/**
	 *  ```
	 *  pos_y \
	 *  ```
	 **/
	pos_y() {
		return ""
	}

} }

