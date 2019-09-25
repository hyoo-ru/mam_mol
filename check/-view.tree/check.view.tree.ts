namespace $ { export class $mol_check extends $mol_button_minor {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_check_checked <= checked?val
	 *  	aria-checked <= checked?val
	 *  	role \checkbox
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_check_checked" :  this.checked() ,
			"aria-checked" :  this.checked() ,
			"role" :  "checkbox" ,
		})
	}

	/**
	 *  ```
	 *  checked?val false
	 *  ```
	 **/
	@ $mol_mem
	checked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Icon
	 *  	<= label
	 *  ```
	 **/
	sub() {
		return [].concat( this.Icon() , this.label() )
	}

	/**
	 *  ```
	 *  Icon null
	 *  ```
	 **/
	Icon() {
		return null as any
	}

	/**
	 *  ```
	 *  label / <= Title
	 *  ```
	 **/
	label() {
		return [].concat( this.Title() )
	}

	/**
	 *  ```
	 *  Title $mol_view sub / <= title
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.title() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  title \
	 *  ```
	 **/
	title() {
		return ""
	}

} }

