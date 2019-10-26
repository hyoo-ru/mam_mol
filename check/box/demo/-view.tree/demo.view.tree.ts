namespace $ { export class $mol_check_box_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Checkboxes in various states
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_check_box_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Labeled_base
	 *  	<= Labeled_checked
	 *  	<= Labeled_disabled
	 *  	<= Alone_base
	 *  	<= Alone_checked
	 *  	<= Alone_disabled
	 *  ```
	 **/
	sub() {
		return [ this.Labeled_base() , this.Labeled_checked() , this.Labeled_disabled() , this.Alone_base() , this.Alone_checked() , this.Alone_disabled() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Labeled_base $mol_check_box
	 *  	checked?val <=> base_checked?val
	 *  	title <= c1Label
	 *  ```
	 **/
	@ $mol_mem
	Labeled_base() {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.base_checked( val )
			obj.title = () => this.c1Label()
			return obj
		})( new this.$.$mol_check_box(  ) )
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
	 *  c1Label @ \Base
	 *  ```
	 **/
	c1Label() {
		return this.$.$mol_locale.text( "$mol_check_box_demo_c1Label" )
	}

	/**
	 *  ```
	 *  Labeled_checked $mol_check_box
	 *  	title <= c2Label
	 *  	checked?val <=> checked_checked?val
	 *  ```
	 **/
	@ $mol_mem
	Labeled_checked() {
		return (( obj )=>{
			obj.title = () => this.c2Label()
			obj.checked = ( val? : any ) => this.checked_checked( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  c2Label @ \Checked
	 *  ```
	 **/
	c2Label() {
		return this.$.$mol_locale.text( "$mol_check_box_demo_c2Label" )
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
	 *  Labeled_disabled $mol_check_box
	 *  	title <= c6Label
	 *  	checked true
	 *  	enabled false
	 *  ```
	 **/
	@ $mol_mem
	Labeled_disabled() {
		return (( obj )=>{
			obj.title = () => this.c6Label()
			obj.checked = () => true
			obj.enabled = () => false
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  c6Label @ \Disabled
	 *  ```
	 **/
	c6Label() {
		return this.$.$mol_locale.text( "$mol_check_box_demo_c6Label" )
	}

	/**
	 *  ```
	 *  Alone_base $mol_check_box checked?val <=> base_checked?val
	 *  ```
	 **/
	@ $mol_mem
	Alone_base() {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.base_checked( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  Alone_checked $mol_check_box checked?val <=> checked_checked?val
	 *  ```
	 **/
	@ $mol_mem
	Alone_checked() {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.checked_checked( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  Alone_disabled $mol_check_box
	 *  	checked true
	 *  	enabled false
	 *  ```
	 **/
	@ $mol_mem
	Alone_disabled() {
		return (( obj )=>{
			obj.checked = () => true
			obj.enabled = () => false
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

} }

