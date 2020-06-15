namespace $ { export class $mol_lights_toggle extends $mol_check_icon {

	/**
	 *  ```
	 *  Icon <= Lights_icon
	 *  ```
	 **/
	Icon() {
		return this.Lights_icon()
	}

	/**
	 *  ```
	 *  Lights_icon $mol_icon_brightness_6
	 *  ```
	 **/
	@ $mol_mem
	Lights_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_brightness_6(  ) )
	}

	/**
	 *  ```
	 *  hint @ \Toggle lights
	 *  ```
	 **/
	hint() {
		return this.$.$mol_locale.text( "$mol_lights_toggle_hint" )
	}

	/**
	 *  ```
	 *  checked?val <=> lights?val
	 *  ```
	 **/
	@ $mol_mem
	checked( val? : any , force? : $mol_mem_force ) {
		return this.lights( val )
	}

	/**
	 *  ```
	 *  lights?val false
	 *  ```
	 **/
	@ $mol_mem
	lights( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

} }
