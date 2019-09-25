namespace $ { export class $mol_paginator_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Page switcher
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_paginator_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Pages
	 *  ```
	 **/
	sub() {
		return [].concat( this.Pages() )
	}

	/**
	 *  ```
	 *  Pages $mol_paginator value?val <=> page?val
	 *  ```
	 **/
	@ $mol_mem
	Pages() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.page( val )
			return obj
		})( new this.$.$mol_paginator(  ) )
	}

	/**
	 *  ```
	 *  page?val 0
	 *  ```
	 **/
	@ $mol_mem
	page( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

} }

