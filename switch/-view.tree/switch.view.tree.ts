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
	 *  Option!id $mol_switch_option
	 *  	checked?val <=> option_checked!id?val
	 *  	label <= option_label!id
	 *  	enabled <= option_enabled!id
	 *  ```
	 **/
	@ $mol_mem_key
	Option( id : any ) {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.option_checked(id , val )
			obj.label = () => this.option_label(id)
			obj.enabled = () => this.option_enabled(id)
			return obj
		})( new this.$.$mol_switch_option(  ) )
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
	 *  option_label!id / <= option_title!id
	 *  ```
	 **/
	option_label( id : any ) {
		return [this.option_title(id)] as readonly any[]
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
	 *  keys /string
	 *  ```
	 **/
	keys() {
		return [] as readonly ( string )[]
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
		return [] as readonly ( $mol_check )[]
	}

} }
namespace $ { export class $mol_switch_option extends $mol_check {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_theme <= theme
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_theme" :  this.theme() ,
		})
	}

	/**
	 *  ```
	 *  theme \
	 *  ```
	 **/
	theme() {
		return ""
	}

} }
