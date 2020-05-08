namespace $ { export class $mol_view_tree_test_binding extends $mol_view {

	/**
	 *  ```
	 *  value?val <=> task_title_new?val
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_mem_force ) {
		return this.task_title_new( val )
	}

	/**
	 *  ```
	 *  task_title_new?val \123
	 *  ```
	 **/
	@ $mol_mem
	task_title_new( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "123"
	}

	/**
	 *  ```
	 *  enabled <= head_complete_enabled
	 *  ```
	 **/
	enabled() {
		return this.head_complete_enabled()
	}

	/**
	 *  ```
	 *  head_complete_enabled false
	 *  ```
	 **/
	head_complete_enabled() {
		return false
	}

} }
