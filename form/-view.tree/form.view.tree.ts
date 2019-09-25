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
	keydown( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  submit?event null
	 *  ```
	 **/
	@ $mol_mem
	submit( event? : any , force? : $mol_atom_force ) {
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
		return [].concat( this.Bar_fields() , this.Bar_buttons() )
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
	 *  form_fields /
	 *  ```
	 **/
	form_fields() {
		return [].concat(  )
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
	 *  buttons /
	 *  ```
	 **/
	buttons() {
		return [].concat(  )
	}

} }

