namespace $ { export class $mol_expander extends $mol_list {

	/**
	 *  ```
	 *  rows /
	 *  	<= Label
	 *  	<= Content
	 *  ```
	 **/
	rows() {
		return [ this.Label() , this.Content() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Label $mol_view sub /
	 *  	<= Trigger
	 *  	<= Tools
	 *  ```
	 **/
	@ $mol_mem
	Label() {
		return (( obj )=>{
			obj.sub = () => [ this.Trigger() , this.Tools() ] as readonly any[]
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
	expanded( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  label / <= title
	 *  ```
	 **/
	label() {
		return [ this.title() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Tools null
	 *  ```
	 **/
	Tools() {
		return null as any
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
		return [  ] as readonly any[]
	}

} }

