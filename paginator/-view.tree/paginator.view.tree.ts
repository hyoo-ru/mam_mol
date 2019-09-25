namespace $ { export class $mol_paginator extends $mol_view {

	/**
	 *  ```
	 *  sub /
	 *  	<= Backward
	 *  	<= Value
	 *  	<= Forward
	 *  ```
	 **/
	sub() {
		return [].concat( this.Backward() , this.Value() , this.Forward() )
	}

	/**
	 *  ```
	 *  Backward $mol_button_minor
	 *  	hint <= backward_hint
	 *  	click?event <=> backward?event
	 *  	sub / <= Backward_icon
	 *  ```
	 **/
	@ $mol_mem
	Backward() {
		return (( obj )=>{
			obj.hint = () => this.backward_hint()
			obj.click = ( event? : any ) => this.backward( event )
			obj.sub = () => [].concat( this.Backward_icon() )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  backward_hint @ \Назад
	 *  ```
	 **/
	backward_hint() {
		return this.$.$mol_locale.text( "$mol_paginator_backward_hint" )
	}

	/**
	 *  ```
	 *  backward?event null
	 *  ```
	 **/
	@ $mol_mem
	backward( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Backward_icon $mol_icon_chevron
	 *  ```
	 **/
	@ $mol_mem
	Backward_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_chevron(  ) )
	}

	/**
	 *  ```
	 *  Value $mol_view sub / <= value?val
	 *  ```
	 **/
	@ $mol_mem
	Value() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.value() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  value?val 0
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  Forward $mol_button_minor
	 *  	hint <= forward_hint
	 *  	click?event <=> forward?event
	 *  	sub / <= Forward_icon
	 *  ```
	 **/
	@ $mol_mem
	Forward() {
		return (( obj )=>{
			obj.hint = () => this.forward_hint()
			obj.click = ( event? : any ) => this.forward( event )
			obj.sub = () => [].concat( this.Forward_icon() )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  forward_hint @ \Вперёд
	 *  ```
	 **/
	forward_hint() {
		return this.$.$mol_locale.text( "$mol_paginator_forward_hint" )
	}

	/**
	 *  ```
	 *  forward?event null
	 *  ```
	 **/
	@ $mol_mem
	forward( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Forward_icon $mol_icon_chevron
	 *  ```
	 **/
	@ $mol_mem
	Forward_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_chevron(  ) )
	}

} }

