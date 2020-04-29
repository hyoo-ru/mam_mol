namespace $ { export class $mol_search_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Simple search field with suggest
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_search_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Search
	 *  ```
	 **/
	sub() {
		return [this.Search()] as readonly any[]
	}

	query() {
		return this.Search().query(  )
	}

	/**
	 *  ```
	 *  Search $mol_search
	 *  	query => query
	 *  	suggests <= suggests
	 *  ```
	 **/
	@ $mol_mem
	Search() {
		return (( obj )=>{
			obj.suggests = () => this.suggests()
			return obj
		})( new this.$.$mol_search(  ) )
	}

	/**
	 *  ```
	 *  suggests /
	 *  ```
	 **/
	suggests() {
		return [] as readonly any[]
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/search/demo/-view.tree/demo.view.tree.map