namespace $ { export class $mol_view_tree_test_attributes_subcomponent extends $mol_view {

	/**
	 *  ```
	 *  Page!index $mol_view_tree_test_attributes_subcomponent_page Sub <= page!index
	 *  ```
	 **/
	@ $mol_mem_key
	Page( index : any ) {
		return (( obj )=>{
			obj.Sub = () => this.page(index)
			return obj
		})( new this.$.$mol_view_tree_test_attributes_subcomponent_page(  ) )
	}

	/**
	 *  ```
	 *  page!index null
	 *  ```
	 **/
	page( index : any ) {
		return null as any
	}

} }
namespace $ { export class $mol_view_tree_test_attributes_subcomponent_page extends $mol_view {

	/**
	 *  ```
	 *  Sub null
	 *  ```
	 **/
	Sub() {
		return null as any
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/view/tree/test/-view.tree/subcomponent.view.tree.map