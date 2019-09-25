namespace $ { export class $mol_perf_uibench_tree extends $mol_view {

	/**
	 *  ```
	 *  state null
	 *  ```
	 **/
	state() {
		return null as any
	}

	/**
	 *  ```
	 *  attr_static *
	 *  	^
	 *  	class \Tree
	 *  ```
	 **/
	attr_static() {
		return ({
			...super.attr_static() ,
			"class" :  "Tree" ,
		})
	}

	/**
	 *  ```
	 *  sub / <= Root
	 *  ```
	 **/
	sub() {
		return [].concat( this.Root() )
	}

	/**
	 *  ```
	 *  Root $mol_perf_uibench_tree_branch state <= root_state
	 *  ```
	 **/
	@ $mol_mem
	Root() {
		return (( obj )=>{
			obj.state = () => this.root_state()
			return obj
		})( new this.$.$mol_perf_uibench_tree_branch(  ) )
	}

	/**
	 *  ```
	 *  root_state null
	 *  ```
	 **/
	root_state() {
		return null as any
	}

} }

namespace $ { export class $mol_perf_uibench_tree_branch extends $mol_list {

	/**
	 *  ```
	 *  state null
	 *  ```
	 **/
	state() {
		return null as any
	}

	/**
	 *  ```
	 *  dom_name \ul
	 *  ```
	 **/
	dom_name() {
		return "ul"
	}

	/**
	 *  ```
	 *  attr_static *
	 *  	^
	 *  	class \TreeNode
	 *  ```
	 **/
	attr_static() {
		return ({
			...super.attr_static() ,
			"class" :  "TreeNode" ,
		})
	}

	/**
	 *  ```
	 *  Branch!index $mol_perf_uibench_tree_branch state <= branch_state!index
	 *  ```
	 **/
	@ $mol_mem_key
	Branch( index : any ) {
		return (( obj )=>{
			obj.state = () => this.branch_state(index)
			return obj
		})( new this.$.$mol_perf_uibench_tree_branch(  ) )
	}

	/**
	 *  ```
	 *  branch_state!index null
	 *  ```
	 **/
	branch_state( index : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  Leaf!index $mol_perf_uibench_tree_leaf text <= leaf_state!index
	 *  ```
	 **/
	@ $mol_mem_key
	Leaf( index : any ) {
		return (( obj )=>{
			obj.text = () => this.leaf_state(index)
			return obj
		})( new this.$.$mol_perf_uibench_tree_leaf(  ) )
	}

	/**
	 *  ```
	 *  leaf_state!index null
	 *  ```
	 **/
	leaf_state( index : any ) {
		return null as any
	}

} }

namespace $ { export class $mol_perf_uibench_tree_leaf extends $mol_view {

	/**
	 *  ```
	 *  minimal_height 26
	 *  ```
	 **/
	minimal_height() {
		return 26
	}

	/**
	 *  ```
	 *  dom_name \li
	 *  ```
	 **/
	dom_name() {
		return "li"
	}

	/**
	 *  ```
	 *  attr_static *
	 *  	^
	 *  	class \TreeLeaf
	 *  ```
	 **/
	attr_static() {
		return ({
			...super.attr_static() ,
			"class" :  "TreeLeaf" ,
		})
	}

	/**
	 *  ```
	 *  sub / <= text
	 *  ```
	 **/
	sub() {
		return [].concat( this.text() )
	}

	/**
	 *  ```
	 *  text \
	 *  ```
	 **/
	text() {
		return ""
	}

} }

