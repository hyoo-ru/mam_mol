namespace $ { export class $mol_textarea_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Text input field in various states
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_textarea_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Empty_descr
	 *  	<= Filled_descr
	 *  	<= Disabled
	 *  ```
	 **/
	sub() {
		return [this.Empty_descr() , this.Filled_descr() , this.Disabled()] as readonly any[]
	}

	/**
	 *  ```
	 *  Empty_descr $mol_textarea
	 *  	hint \source code
	 *  	value?val <=> empty_descr?val
	 *  ```
	 **/
	@ $mol_mem
	Empty_descr() {
		return (( obj )=>{
			obj.hint = () => "source code"
			obj.value = ( val? : any ) => this.empty_descr( val )
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  empty_descr?val \
	 *  ```
	 **/
	@ $mol_mem
	empty_descr( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Filled_descr $mol_textarea value?val <=> filled_descr?val
	 *  ```
	 **/
	@ $mol_mem
	Filled_descr() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.filled_descr( val )
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  filled_descr?val \
	 *  	\function hello( name = 'World' ) {
	 *  	\	return `Hello, ${ name }!`
	 *  	\}
	 *  ```
	 **/
	@ $mol_mem
	filled_descr( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "function hello( name = 'World' ) {\n\treturn `Hello, ${ name }!`\n}"
	}

	/**
	 *  ```
	 *  Disabled $mol_textarea
	 *  	enabled false
	 *  	value?val <=> filled_descr?val
	 *  ```
	 **/
	@ $mol_mem
	Disabled() {
		return (( obj )=>{
			obj.enabled = () => false
			obj.value = ( val? : any ) => this.filled_descr( val )
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/textarea/demo/-view.tree/demo.view.tree.map