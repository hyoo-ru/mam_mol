namespace $ { export class $mol_perf_uibench extends $mol_scroll {

	/**
	 *  ```
	 *  attr_static *
	 *  	^
	 *  	class \Main
	 *  ```
	 **/
	attr_static() {
		return ({
			...super.attr_static() ,
			"class" :  "Main" ,
		})
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Table
	 *  	<= Anim
	 *  	<= Tree
	 *  ```
	 **/
	sub() {
		return [this.Table() , this.Anim() , this.Tree()] as readonly any[]
	}

	/**
	 *  ```
	 *  Table $mol_perf_uibench_table state <= table_state
	 *  ```
	 **/
	@ $mol_mem
	Table() {
		return (( obj )=>{
			obj.state = () => this.table_state()
			return obj
		})( new this.$.$mol_perf_uibench_table(  ) )
	}

	/**
	 *  ```
	 *  table_state null
	 *  ```
	 **/
	table_state() {
		return null as any
	}

	/**
	 *  ```
	 *  Anim $mol_perf_uibench_anim state <= anim_state
	 *  ```
	 **/
	@ $mol_mem
	Anim() {
		return (( obj )=>{
			obj.state = () => this.anim_state()
			return obj
		})( new this.$.$mol_perf_uibench_anim(  ) )
	}

	/**
	 *  ```
	 *  anim_state null
	 *  ```
	 **/
	anim_state() {
		return null as any
	}

	/**
	 *  ```
	 *  Tree $mol_perf_uibench_tree state <= tree_state
	 *  ```
	 **/
	@ $mol_mem
	Tree() {
		return (( obj )=>{
			obj.state = () => this.tree_state()
			return obj
		})( new this.$.$mol_perf_uibench_tree(  ) )
	}

	/**
	 *  ```
	 *  tree_state null
	 *  ```
	 **/
	tree_state() {
		return null as any
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/perf/uibench/-view.tree/uibench.view.tree.map