namespace $ { export class $mol_number extends $mol_view {

	/**
	 *  ```
	 *  precision_view <= precision
	 *  ```
	 **/
	precision_view() {
		return this.precision()
	}

	/**
	 *  ```
	 *  precision 1
	 *  ```
	 **/
	precision() {
		return 1
	}

	/**
	 *  ```
	 *  precision_change <= precision
	 *  ```
	 **/
	precision_change() {
		return this.precision()
	}

	/**
	 *  ```
	 *  value?val NaN
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : NaN
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= String
	 *  	<= Dec
	 *  	<= Inc
	 *  ```
	 **/
	sub() {
		return [ this.String() , this.Dec() , this.Inc() ] as readonly any[]
	}

	/**
	 *  ```
	 *  String $mol_string
	 *  	type \number
	 *  	value?val <=> value_string?val
	 *  	hint <= hint
	 *  	enabled <= string_enabled
	 *  	debounce <= debounce
	 *  ```
	 **/
	@ $mol_mem
	String() {
		return (( obj )=>{
			obj.type = () => "number"
			obj.value = ( val? : any ) => this.value_string( val )
			obj.hint = () => this.hint()
			obj.enabled = () => this.string_enabled()
			obj.debounce = () => this.debounce()
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  value_string?val \
	 *  ```
	 **/
	@ $mol_mem
	value_string( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  hint \
	 *  ```
	 **/
	hint() {
		return ""
	}

	/**
	 *  ```
	 *  string_enabled <= enabled
	 *  ```
	 **/
	string_enabled() {
		return this.enabled()
	}

	/**
	 *  ```
	 *  enabled true
	 *  ```
	 **/
	enabled() {
		return true
	}

	/**
	 *  ```
	 *  debounce 200
	 *  ```
	 **/
	debounce() {
		return 200
	}

	/**
	 *  ```
	 *  Dec $mol_button_minor
	 *  	event_click?val <=> event_dec?val
	 *  	enabled <= dec_enabled
	 *  	sub / <= dec_icon
	 *  ```
	 **/
	@ $mol_mem
	Dec() {
		return (( obj )=>{
			obj.event_click = ( val? : any ) => this.event_dec( val )
			obj.enabled = () => this.dec_enabled()
			obj.sub = () => [ this.dec_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  event_dec?val null
	 *  ```
	 **/
	@ $mol_mem
	event_dec( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  dec_enabled <= enabled
	 *  ```
	 **/
	dec_enabled() {
		return this.enabled()
	}

	/**
	 *  ```
	 *  dec_icon $mol_icon_minus
	 *  ```
	 **/
	@ $mol_mem
	dec_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_minus(  ) )
	}

	/**
	 *  ```
	 *  Inc $mol_button_minor
	 *  	event_click?val <=> event_inc?val
	 *  	enabled <= inc_enabled
	 *  	sub / <= inc_icon
	 *  ```
	 **/
	@ $mol_mem
	Inc() {
		return (( obj )=>{
			obj.event_click = ( val? : any ) => this.event_inc( val )
			obj.enabled = () => this.inc_enabled()
			obj.sub = () => [ this.inc_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  event_inc?val null
	 *  ```
	 **/
	@ $mol_mem
	event_inc( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  inc_enabled <= enabled
	 *  ```
	 **/
	inc_enabled() {
		return this.enabled()
	}

	/**
	 *  ```
	 *  inc_icon $mol_icon_plus
	 *  ```
	 **/
	@ $mol_mem
	inc_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_plus(  ) )
	}

} }

