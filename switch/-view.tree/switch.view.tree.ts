namespace $ { export class $mol_switch extends $mol_view {

	/**
	 *  ```
	 *  minimal_height 40
	 *  ```
	 **/
	minimal_height() {
		return 40
	}

	/**
	 *  ```
	 *  Option!id $mol_check
	 *  	checked?val <=> option_checked!id?val
	 *  	title <= option_title!id
	 *  	enabled <= option_enabled!id
	 *  ```
	 **/
	@ $mol_mem_key
	Option( id : any ) {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.option_checked(id , val )
			obj.title = () => this.option_title(id)
			obj.enabled = () => this.option_enabled(id)
			return obj
		})( new this.$.$mol_check(  ) )
	}

	/**
	 *  ```
	 *  option_checked!id?val false
	 *  ```
	 **/
	@ $mol_mem_key
	option_checked( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  option_title!id \
	 *  ```
	 **/
	option_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  option_enabled!id <= enabled
	 *  ```
	 **/
	option_enabled( id : any ) {
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
	 *  value?val null
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  options *
	 *  ```
	 **/
	options() {
		return ({
		})
	}

	/**
	 *  ```
	 *  sub <= items
	 *  ```
	 **/
	sub() {
		return this.items()
	}

	/**
	 *  ```
	 *  items /$mol_check
	 *  ```
	 **/
	items() {
		return [  ] as readonly ( $mol_check )[]
	}

} }

