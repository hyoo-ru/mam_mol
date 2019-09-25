namespace $ { export class $mol_app_taxon_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  sub / <= App
	 *  ```
	 **/
	sub() {
		return [].concat( this.App() )
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
	 *  record!path *
	 *  ```
	 **/
	record( path : any ) {
		return ({
		})
	}

} }

