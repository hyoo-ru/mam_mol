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
		return [this.Priority()] as readonly any[]
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
			obj.options = () => ["Highest " , "High" , "Medium" , "Low" , "Lowest"] as readonly any[]
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  priority?val \Lowest
	 *  ```
	 **/
	@ $mol_mem
	priority( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "Lowest"
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/select/demo/priority/-view.tree/priority.view.tree.map