namespace $ { export class $mol_bar_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Group of controls as one control
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_bar_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Two
	 *  	<= Three
	 *  ```
	 **/
	sub() {
		return [ this.Two() , this.Three() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Two $mol_bar sub /
	 *  	<= Two_mail
	 *  	<= Two_submit
	 *  ```
	 **/
	@ $mol_mem
	Two() {
		return (( obj )=>{
			obj.sub = () => [ this.Two_mail() , this.Two_submit() ] as readonly any[]
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  Two_mail $mol_string
	 *  	hint <= mail_hint
	 *  	value?val <=> mail?val
	 *  ```
	 **/
	@ $mol_mem
	Two_mail() {
		return (( obj )=>{
			obj.hint = () => this.mail_hint()
			obj.value = ( val? : any ) => this.mail( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  mail_hint \E-mail
	 *  ```
	 **/
	mail_hint() {
		return "E-mail"
	}

	/**
	 *  ```
	 *  mail?val \
	 *  ```
	 **/
	@ $mol_mem
	mail( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Two_submit $mol_button_minor title <= submit_title
	 *  ```
	 **/
	@ $mol_mem
	Two_submit() {
		return (( obj )=>{
			obj.title = () => this.submit_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  submit_title \Submit
	 *  ```
	 **/
	submit_title() {
		return "Submit"
	}

	/**
	 *  ```
	 *  Three $mol_bar sub /
	 *  	<= Three_mail
	 *  	<= Three_confirm
	 *  	<= Three_submit
	 *  ```
	 **/
	@ $mol_mem
	Three() {
		return (( obj )=>{
			obj.sub = () => [ this.Three_mail() , this.Three_confirm() , this.Three_submit() ] as readonly any[]
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  Three_mail $mol_string
	 *  	hint <= mail_hint
	 *  	value?val <=> mail?val
	 *  ```
	 **/
	@ $mol_mem
	Three_mail() {
		return (( obj )=>{
			obj.hint = () => this.mail_hint()
			obj.value = ( val? : any ) => this.mail( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  Three_confirm $mol_check_box
	 *  	title <= confirm_title
	 *  	checked?val <=> confirmed?val
	 *  ```
	 **/
	@ $mol_mem
	Three_confirm() {
		return (( obj )=>{
			obj.title = () => this.confirm_title()
			obj.checked = ( val? : any ) => this.confirmed( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  confirm_title \Confirm
	 *  ```
	 **/
	confirm_title() {
		return "Confirm"
	}

	/**
	 *  ```
	 *  confirmed?val false
	 *  ```
	 **/
	@ $mol_mem
	confirmed( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Three_submit $mol_button_minor title <= submit_title
	 *  ```
	 **/
	@ $mol_mem
	Three_submit() {
		return (( obj )=>{
			obj.title = () => this.submit_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

} }

