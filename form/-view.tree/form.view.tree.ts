namespace $ { export class $mol_form extends $mol_view {

	/**
	 *  ```
	 *  submit_blocked false
	 *  ```
	 **/
	submit_blocked() {
		return false
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	keydown?event <=> keydown?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"keydown" :  ( event? : any )=>  this.keydown( event ) ,
		})
	}

	/**
	 *  ```
	 *  keydown?event null
	 *  ```
	 **/
	@ $mol_mem
	keydown( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  submit?event null
	 *  ```
	 **/
	@ $mol_mem
	submit( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Bar_fields
	 *  	<= Bar_buttons
	 *  ```
	 **/
	sub() {
		return [ this.Bar_fields() , this.Bar_buttons() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Bar_fields $mol_view sub <= form_fields
	 *  ```
	 **/
	@ $mol_mem
	Bar_fields() {
		return (( obj )=>{
			obj.sub = () => this.form_fields()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  form_fields /$mol_form_field
	 *  ```
	 **/
	form_fields() {
		return [  ] as readonly ( $mol_form_field )[]
	}

	/**
	 *  ```
	 *  Bar_buttons $mol_row sub <= buttons
	 *  ```
	 **/
	@ $mol_mem
	Bar_buttons() {
		return (( obj )=>{
			obj.sub = () => this.buttons()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  buttons /$mol_view
	 *  ```
	 **/
	buttons() {
		return [  ] as readonly ( $mol_view )[]
	}

} }

