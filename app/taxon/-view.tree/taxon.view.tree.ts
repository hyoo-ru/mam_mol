namespace $ { export class $mol_app_taxon extends $mol_page {

	/**
	 *  ```
	 *  title @ \Big hierarchical table demo
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_taxon_title" )
	}

	/**
	 *  ```
	 *  Body <= Grid
	 *  ```
	 **/
	Body() {
		return this.Grid()
	}

	/**
	 *  ```
	 *  Grid $mol_grid
	 *  	hierarchy <= hierarchy
	 *  	hierarchy_col <= hierarchy_field
	 *  	record!id <= record!id
	 *  ```
	 **/
	@ $mol_mem
	Grid() {
		return (( obj )=>{
			obj.hierarchy = () => this.hierarchy()
			obj.hierarchy_col = () => this.hierarchy_field()
			obj.record = ( id : any ) => this.record(id)
			return obj
		})( new this.$.$mol_grid(  ) )
	}

	/**
	 *  ```
	 *  hierarchy null
	 *  ```
	 **/
	hierarchy() {
		return null as any
	}

	/**
	 *  ```
	 *  hierarchy_field \Butxt
	 *  ```
	 **/
	hierarchy_field() {
		return "Butxt"
	}

	/**
	 *  ```
	 *  record!id null
	 *  ```
	 **/
	record( id : any ) {
		return null as any
	}

} }

