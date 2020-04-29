namespace $ { export class $mol_infinite extends $mol_list {

	/**
	 *  ```
	 *  after!id /
	 *  ```
	 **/
	after( id : any ) {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Row!id $mol_view
	 *  ```
	 **/
	@ $mol_mem_key
	Row( id : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/infinite/-view.tree/infinite.view.tree.map