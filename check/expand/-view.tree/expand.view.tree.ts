namespace $ { export class $mol_check_expand extends $mol_check {

	/**
	 *  ```
	 *  minimal_height 40
	 *  ```
	 **/
	minimal_height() {
		return 40
	}

	/**
	 *  ```
	 *  Icon $mol_icon_chevron
	 *  ```
	 **/
	@ $mol_mem
	Icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_chevron(  ) )
	}

	/**
	 *  ```
	 *  level 0
	 *  ```
	 **/
	level() {
		return 0
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	paddingLeft <= level_style
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"paddingLeft" :  this.level_style() ,
		})
	}

	/**
	 *  ```
	 *  level_style \0px
	 *  ```
	 **/
	level_style() {
		return "0px"
	}

	/**
	 *  ```
	 *  checked?val <=> expanded?val
	 *  ```
	 **/
	@ $mol_mem
	checked( val? : any , force? : $mol_mem_force ) {
		return this.expanded( val )
	}

	/**
	 *  ```
	 *  expanded?val false
	 *  ```
	 **/
	@ $mol_mem
	expanded( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  enabled <= expandable
	 *  ```
	 **/
	enabled() {
		return this.expandable()
	}

	/**
	 *  ```
	 *  expandable false
	 *  ```
	 **/
	expandable() {
		return false
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/check/expand/-view.tree/expand.view.tree.map