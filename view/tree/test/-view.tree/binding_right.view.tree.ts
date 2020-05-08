namespace $ { export class $mol_view_tree_test_binding_right extends $mol_view {

	outer_width( v? : any ) {
		return this.Test().width( v )
	}

	/**
	 *  ```
	 *  Test $mol_view_tree_test_binding_right_test width?v => outer_width?v
	 *  ```
	 **/
	@ $mol_mem
	Test() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_view_tree_test_binding_right_test(  ) )
	}

} }
namespace $ { export class $mol_view_tree_test_binding_right_test extends $mol_view {

	/**
	 *  ```
	 *  width?val 0
	 *  ```
	 **/
	@ $mol_mem
	width( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

} }
