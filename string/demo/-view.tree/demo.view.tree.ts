namespace $ { export class $mol_string_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \String input field in various states
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_string_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Simple
	 *  	<= Hint
	 *  	<= Filled
	 *  	<= Disabled
	 *  ```
	 **/
	sub() {
		return [ this.Simple() , this.Hint() , this.Filled() , this.Disabled() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Simple $mol_string value?val <=> name?val
	 *  ```
	 **/
	@ $mol_mem
	Simple() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.name( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  name?val \
	 *  ```
	 **/
	@ $mol_mem
	name( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Hint $mol_string
	 *  	hint \Batman
	 *  	value?val <=> name?val
	 *  ```
	 **/
	@ $mol_mem
	Hint() {
		return (( obj )=>{
			obj.hint = () => "Batman"
			obj.value = ( val? : any ) => this.name( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  Filled $mol_string value?val <=> name2?val
	 *  ```
	 **/
	@ $mol_mem
	Filled() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.name2( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  name2?val \Jocker
	 *  ```
	 **/
	@ $mol_mem
	name2( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "Jocker"
	}

	/**
	 *  ```
	 *  Disabled $mol_string
	 *  	disabled true
	 *  	value?val <=> name2?val
	 *  ```
	 **/
	@ $mol_mem
	Disabled() {
		return (( obj )=>{
			obj.disabled = () => true
			obj.value = ( val? : any ) => this.name2( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

} }

