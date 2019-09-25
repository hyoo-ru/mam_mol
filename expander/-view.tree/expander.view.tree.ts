namespace $ { export class $mol_expander extends $mol_list {

	/**
	 *  ```
	 *  rows /
	 *  	<= Label
	 *  	<= Content
	 *  ```
	 **/
	rows() {
		return [].concat( this.Label() , this.Content() )
	}

	/**
	 *  ```
	 *  Label $mol_view sub /
	 *  	<= Trigger
	 *  	<= tools
	 *  ```
	 **/
	@ $mol_mem
	Label() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Trigger() , this.tools() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Trigger $mol_check_expand
	 *  	checked?val <=> expanded?val
	 *  	label <= label
	 *  ```
	 **/
	@ $mol_mem
	Trigger() {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.expanded( val )
			obj.label = () => this.label()
			return obj
		})( new this.$.$mol_check_expand(  ) )
	}

	/**
	 *  ```
	 *  expanded?val false
	 *  ```
	 **/
	@ $mol_mem
	expanded( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  label / <= title
	 *  ```
	 **/
	label() {
		return [].concat( this.title() )
	}

	/**
	 *  ```
	 *  tools /
	 *  ```
	 **/
	tools() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Content $mol_view sub <= content
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.sub = () => this.content()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  content /
	 *  ```
	 **/
	content() {
		return [].concat(  )
	}

} }

