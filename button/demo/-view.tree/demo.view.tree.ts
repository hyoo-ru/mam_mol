namespace $ { export class $mol_button_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \All types of buttons in every states
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_button_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Major_enabled
	 *  	<= Major_disabled
	 *  	<= Minor_enabled
	 *  	<= Minor_disabled
	 *  ```
	 **/
	sub() {
		return [ this.Major_enabled() , this.Major_disabled() , this.Minor_enabled() , this.Minor_disabled() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Major_enabled $mol_button_major title <= major_label
	 *  ```
	 **/
	@ $mol_mem
	Major_enabled() {
		return (( obj )=>{
			obj.title = () => this.major_label()
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  major_label @ \Click me!
	 *  ```
	 **/
	major_label() {
		return this.$.$mol_locale.text( "$mol_button_demo_major_label" )
	}

	/**
	 *  ```
	 *  Major_disabled $mol_button_major
	 *  	title <= major_label
	 *  	enabled false
	 *  ```
	 **/
	@ $mol_mem
	Major_disabled() {
		return (( obj )=>{
			obj.title = () => this.major_label()
			obj.enabled = () => false
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  Minor_enabled $mol_button_minor title <= minor_label
	 *  ```
	 **/
	@ $mol_mem
	Minor_enabled() {
		return (( obj )=>{
			obj.title = () => this.minor_label()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  minor_label @ \Or click me..
	 *  ```
	 **/
	minor_label() {
		return this.$.$mol_locale.text( "$mol_button_demo_minor_label" )
	}

	/**
	 *  ```
	 *  Minor_disabled $mol_button_minor
	 *  	title <= minor_label
	 *  	enabled false
	 *  ```
	 **/
	@ $mol_mem
	Minor_disabled() {
		return (( obj )=>{
			obj.title = () => this.minor_label()
			obj.enabled = () => false
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

} }

