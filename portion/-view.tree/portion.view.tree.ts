namespace $ { export class $mol_portion_indicator extends $mol_view {

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	width <= width_style
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"width" :  this.width_style() ,
		})
	}

	/**
	 *  ```
	 *  width_style \0
	 *  ```
	 **/
	width_style() {
		return "0"
	}

} }

namespace $ { export class $mol_portion extends $mol_view {

	/**
	 *  ```
	 *  portion 0
	 *  ```
	 **/
	portion() {
		return 0
	}

	/**
	 *  ```
	 *  sub / <= indicator
	 *  ```
	 **/
	sub() {
		return [ this.indicator() ] as readonly any[]
	}

	/**
	 *  ```
	 *  indicator $mol_portion_indicator width_style <= indicator_width_style
	 *  ```
	 **/
	@ $mol_mem
	indicator() {
		return (( obj )=>{
			obj.width_style = () => this.indicator_width_style()
			return obj
		})( new this.$.$mol_portion_indicator(  ) )
	}

	/**
	 *  ```
	 *  indicator_width_style \0
	 *  ```
	 **/
	indicator_width_style() {
		return "0"
	}

} }

