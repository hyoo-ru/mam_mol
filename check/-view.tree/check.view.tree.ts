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
	checked( val? : any , force? : $mol_mem_force ) {
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
		return [this.Icon() , this.label()] as readonly any[]
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
		return [this.Title()] as readonly any[]
	}

	/**
	 *  ```
	 *  Title $mol_view sub / <= title
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.sub = () => [this.title()] as readonly any[]
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
