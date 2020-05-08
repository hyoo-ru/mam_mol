namespace $ { export class $mol_code extends $mol_view {

	/**
	 *  ```
	 *  sub /
	 *  	<= Manual
	 *  	<= Scan
	 *  ```
	 **/
	sub() {
		return [this.Manual() , this.Scan()] as readonly any[]
	}

	/**
	 *  ```
	 *  Manual $mol_search
	 *  	query?val <=> value?val
	 *  	hint <= hint
	 *  	debounce <= debounce
	 *  ```
	 **/
	@ $mol_mem
	Manual() {
		return (( obj )=>{
			obj.query = ( val? : any ) => this.value( val )
			obj.hint = () => this.hint()
			obj.debounce = () => this.debounce()
			return obj
		})( new this.$.$mol_search(  ) )
	}

	/**
	 *  ```
	 *  value?val \
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  hint <= format
	 *  ```
	 **/
	hint() {
		return this.format()
	}

	/**
	 *  ```
	 *  format \
	 *  ```
	 **/
	format() {
		return ""
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
	 *  Scan $mol_button
	 *  	event_click?val <=> event_scan?val
	 *  	sub / <= scan_label
	 *  ```
	 **/
	@ $mol_mem
	Scan() {
		return (( obj )=>{
			obj.event_click = ( val? : any ) => this.event_scan( val )
			obj.sub = () => [this.scan_label()] as readonly any[]
			return obj
		})( new this.$.$mol_button(  ) )
	}

	/**
	 *  ```
	 *  event_scan?val null
	 *  ```
	 **/
	@ $mol_mem
	event_scan( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  scan_label @ \Scan
	 *  ```
	 **/
	scan_label() {
		return this.$.$mol_locale.text( "$mol_code_scan_label" )
	}

} }
