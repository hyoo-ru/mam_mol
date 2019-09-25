namespace $ { export class $mol_svg_text extends $mol_svg {

	/**
	 *  ```
	 *  dom_name \text
	 *  ```
	 **/
	dom_name() {
		return "text"
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
	 *  	x <= pos_x
	 *  	y <= pos_y
	 *  	text-anchor <= align
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"x" :  this.pos_x() ,
			"y" :  this.pos_y() ,
			"text-anchor" :  this.align() ,
		})
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

	/**
	 *  ```
	 *  align \middle
	 *  ```
	 **/
	align() {
		return "middle"
	}

	/**
	 *  ```
	 *  sub / <= text
	 *  ```
	 **/
	sub() {
		return [].concat( this.text() )
	}

	/**
	 *  ```
	 *  text \
	 *  ```
	 **/
	text() {
		return ""
	}

} }

