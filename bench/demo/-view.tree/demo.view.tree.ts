namespace $ { export class $mol_bench_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Benchmarking results visualization
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_bench_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= View
	 *  ```
	 **/
	sub() {
		return [this.View()] as readonly any[]
	}

	/**
	 *  ```
	 *  View $mol_bench
	 *  	col_sort?val <=> col_sort?val
	 *  	result <= result
	 *  ```
	 **/
	@ $mol_mem
	View() {
		return (( obj )=>{
			obj.col_sort = ( val? : any ) => this.col_sort( val )
			obj.result = () => this.result()
			return obj
		})( new this.$.$mol_bench(  ) )
	}

	/**
	 *  ```
	 *  col_sort?val \mid
	 *  ```
	 **/
	@ $mol_mem
	col_sort( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "mid"
	}

	/**
	 *  ```
	 *  result *
	 *  ```
	 **/
	result() {
		return ({
		})
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/bench/demo/-view.tree/demo.view.tree.map