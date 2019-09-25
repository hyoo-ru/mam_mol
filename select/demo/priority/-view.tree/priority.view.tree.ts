namespace $ { export class $mol_select_demo_priority extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Priority picker
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_select_demo_priority_title" )
	}

	/**
	 *  ```
	 *  sub / <= Priority
	 *  ```
	 **/
	sub() {
		return [].concat( this.Priority() )
	}

	/**
	 *  ```
	 *  Priority $mol_select
	 *  	Filter null
	 *  	value?val <=> priority?val
	 *  	options /
	 *  		\Highest 
	 *  		\High
	 *  		\Medium
	 *  		\Low
	 *  		\Lowest
	 *  ```
	 **/
	@ $mol_mem
	Priority() {
		return (( obj )=>{
			obj.Filter = () => null as any
			obj.value = ( val? : any ) => this.priority( val )
			obj.options = () => [].concat( "Highest " , "High" , "Medium" , "Low" , "Lowest" )
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  priority?val \Lowest
	 *  ```
	 **/
	@ $mol_mem
	priority( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "Lowest"
	}

} }

