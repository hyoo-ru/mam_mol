namespace $ { export class $mol_app_taxon_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  sub / <= App
	 *  ```
	 **/
	sub() {
		return [ this.App() ] as readonly any[]
	}

	/**
	 *  ```
	 *  App $mol_app_taxon
	 *  	hierarchy_field \name
	 *  	hierarchy <= hierarchy
	 *  	record!path <= record!path
	 *  ```
	 **/
	@ $mol_mem
	App() {
		return (( obj )=>{
			obj.hierarchy_field = () => "name"
			obj.hierarchy = () => this.hierarchy()
			obj.record = ( path : any ) => this.record(path)
			return obj
		})( new this.$.$mol_app_taxon(  ) )
	}

	/**
	 *  ```
	 *  hierarchy *
	 *  ```
	 **/
	hierarchy() {
		return ({
		})
	}

	/**
	 *  ```
	 *  record!path $mol_app_taxon_data_row
	 *  ```
	 **/
	@ $mol_mem_key
	record( path : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_app_taxon_data_row(  ) )
	}

} }

