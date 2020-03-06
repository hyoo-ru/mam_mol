namespace $ { export class $mol_number_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Number input control with various configuration
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_number_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= zero
	 *  	<= one
	 *  	<= two
	 *  	<= three
	 *  	<= four
	 *  	<= five
	 *  	<= six
	 *  	<= seven
	 *  	<= eight
	 *  	<= nine
	 *  ```
	 **/
	sub() {
		return [ this.zero() , this.one() , this.two() , this.three() , this.four() , this.five() , this.six() , this.seven() , this.eight() , this.nine() ] as readonly any[]
	}

	/**
	 *  ```
	 *  zero $mol_number
	 *  ```
	 **/
	@ $mol_mem
	zero() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  one $mol_number value?val <=> year?val
	 *  ```
	 **/
	@ $mol_mem
	one() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.year( val )
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  year?val NaN
	 *  ```
	 **/
	@ $mol_mem
	year( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : NaN
	}

	/**
	 *  ```
	 *  two $mol_number
	 *  	value?val <=> year?val
	 *  	hint \2016
	 *  ```
	 **/
	@ $mol_mem
	two() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.year( val )
			obj.hint = () => "2016"
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  three $mol_number
	 *  	value?val <=> age?val
	 *  	hint \18-99
	 *  	enabled false
	 *  ```
	 **/
	@ $mol_mem
	three() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.age( val )
			obj.hint = () => "18-99"
			obj.enabled = () => false
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  age?val 32
	 *  ```
	 **/
	@ $mol_mem
	age( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 32
	}

	/**
	 *  ```
	 *  four $mol_number
	 *  	value?val <=> year?val
	 *  	string_enabled false
	 *  ```
	 **/
	@ $mol_mem
	four() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.year( val )
			obj.string_enabled = () => false
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  five $mol_number
	 *  	value?val <=> age?val
	 *  	dec_enabled false
	 *  ```
	 **/
	@ $mol_mem
	five() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.age( val )
			obj.dec_enabled = () => false
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  six $mol_number
	 *  	value?val <=> year?val
	 *  	inc_enabled false
	 *  ```
	 **/
	@ $mol_mem
	six() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.year( val )
			obj.inc_enabled = () => false
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  seven $mol_number
	 *  	value?val <=> year?val
	 *  	precision_change 10
	 *  ```
	 **/
	@ $mol_mem
	seven() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.year( val )
			obj.precision_change = () => 10
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  eight $mol_number
	 *  	value?val <=> year?val
	 *  	precision_view 0.01
	 *  ```
	 **/
	@ $mol_mem
	eight() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.year( val )
			obj.precision_view = () => 0.01
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  nine $mol_number
	 *  	value?val <=> year?val
	 *  	precision 1000
	 *  ```
	 **/
	@ $mol_mem
	nine() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.year( val )
			obj.precision = () => 1000
			return obj
		})( new this.$.$mol_number(  ) )
	}

} }

