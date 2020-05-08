namespace $ { export class $mol_dimmer_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Text with highlighted found substring
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_dimmer_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= one
	 *  	<= two
	 *  	<= three
	 *  	<= four
	 *  	<= five
	 *  	<= six
	 *  ```
	 **/
	sub() {
		return [this.one() , this.two() , this.three() , this.four() , this.five() , this.six()] as readonly any[]
	}

	/**
	 *  ```
	 *  one $mol_dimmer
	 *  	haystack \Don't put all your eggs in one basket
	 *  	needle \eggs
	 *  ```
	 **/
	@ $mol_mem
	one() {
		return (( obj )=>{
			obj.haystack = () => "Don't put all your eggs in one basket"
			obj.needle = () => "eggs"
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  two $mol_dimmer
	 *  	haystack \Don't look a gift horse in the mouth.
	 *  	needle \oo
	 *  ```
	 **/
	@ $mol_mem
	two() {
		return (( obj )=>{
			obj.haystack = () => "Don't look a gift horse in the mouth."
			obj.needle = () => "oo"
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  three $mol_dimmer
	 *  	haystack \There is no word you are looking for
	 *  	needle \luck
	 *  ```
	 **/
	@ $mol_mem
	three() {
		return (( obj )=>{
			obj.haystack = () => "There is no word you are looking for"
			obj.needle = () => "luck"
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  four $mol_dimmer
	 *  	haystack \ooAAooAAoo
	 *  	needle \oo
	 *  ```
	 **/
	@ $mol_mem
	four() {
		return (( obj )=>{
			obj.haystack = () => "ooAAooAAoo"
			obj.needle = () => "oo"
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  five $mol_dimmer
	 *  	haystack \Let's search this string
	 *  	needle \Let's search this string
	 *  ```
	 **/
	@ $mol_mem
	five() {
		return (( obj )=>{
			obj.haystack = () => "Let's search this string"
			obj.needle = () => "Let's search this string"
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  six $mol_dimmer
	 *  	haystack \Let's search nothing
	 *  	needle \
	 *  ```
	 **/
	@ $mol_mem
	six() {
		return (( obj )=>{
			obj.haystack = () => "Let's search nothing"
			obj.needle = () => ""
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

} }
