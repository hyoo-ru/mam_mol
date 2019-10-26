namespace $ { export class $mol_check_icon_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Iconic checkboxes in various states
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_check_icon_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Base
	 *  	<= Checked
	 *  	<= Disabled
	 *  ```
	 **/
	sub() {
		return [ this.Base() , this.Checked() , this.Disabled() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Base $mol_check_icon
	 *  	Icon <= Base_icon
	 *  	checked?val <=> base_checked?val
	 *  ```
	 **/
	@ $mol_mem
	Base() {
		return (( obj )=>{
			obj.Icon = () => this.Base_icon()
			obj.checked = ( val? : any ) => this.base_checked( val )
			return obj
		})( new this.$.$mol_check_icon(  ) )
	}

	/**
	 *  ```
	 *  Base_icon $mol_icon_microphone
	 *  ```
	 **/
	@ $mol_mem
	Base_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_microphone(  ) )
	}

	/**
	 *  ```
	 *  base_checked?val false
	 *  ```
	 **/
	@ $mol_mem
	base_checked( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Checked $mol_check_icon
	 *  	Icon <= Checked_icon
	 *  	checked?val <=> checked_checked?val
	 *  ```
	 **/
	@ $mol_mem
	Checked() {
		return (( obj )=>{
			obj.Icon = () => this.Checked_icon()
			obj.checked = ( val? : any ) => this.checked_checked( val )
			return obj
		})( new this.$.$mol_check_icon(  ) )
	}

	/**
	 *  ```
	 *  Checked_icon $mol_icon_microphone
	 *  ```
	 **/
	@ $mol_mem
	Checked_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_microphone(  ) )
	}

	/**
	 *  ```
	 *  checked_checked?val true
	 *  ```
	 **/
	@ $mol_mem
	checked_checked( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/**
	 *  ```
	 *  Disabled $mol_check_box
	 *  	Icon <= Disabled_icon
	 *  	checked true
	 *  	enabled false
	 *  ```
	 **/
	@ $mol_mem
	Disabled() {
		return (( obj )=>{
			obj.Icon = () => this.Disabled_icon()
			obj.checked = () => true
			obj.enabled = () => false
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  Disabled_icon $mol_icon_microphone
	 *  ```
	 **/
	@ $mol_mem
	Disabled_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_microphone(  ) )
	}

} }

