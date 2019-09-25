namespace $ { export class $mol_app_tree extends $mol_page {

	/**
	 *  ```
	 *  title @ \View.Tree compiler
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_tree_title" )
	}

	/**
	 *  ```
	 *  body /
	 *  	<= Source
	 *  	<= Result
	 *  ```
	 **/
	body() {
		return [].concat( this.Source() , this.Result() )
	}

	/**
	 *  ```
	 *  Source $mol_textarea
	 *  	value?val <=> source?val
	 *  	hint <= source_hint
	 *  ```
	 **/
	@ $mol_mem
	Source() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.source( val )
			obj.hint = () => this.source_hint()
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  source?val \
	 *  ```
	 **/
	@ $mol_mem
	source( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  source_hint @ \view.tree source
	 *  ```
	 **/
	source_hint() {
		return this.$.$mol_locale.text( "$mol_app_tree_source_hint" )
	}

	/**
	 *  ```
	 *  Result $mol_scroll sub / <= Result_text
	 *  ```
	 **/
	@ $mol_mem
	Result() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Result_text() )
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Result_text $mol_text text <= result
	 *  ```
	 **/
	@ $mol_mem
	Result_text() {
		return (( obj )=>{
			obj.text = () => this.result()
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  result \
	 *  ```
	 **/
	result() {
		return ""
	}

} }

