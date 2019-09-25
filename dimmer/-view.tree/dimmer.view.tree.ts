namespace $ { export class $mol_dimmer extends $mol_view {

	/**
	 *  ```
	 *  haystack \
	 *  ```
	 **/
	haystack() {
		return ""
	}

	/**
	 *  ```
	 *  needle \
	 *  ```
	 **/
	needle() {
		return ""
	}

	/**
	 *  ```
	 *  sub <= parts
	 *  ```
	 **/
	sub() {
		return this.parts()
	}

	/**
	 *  ```
	 *  parts /
	 *  ```
	 **/
	parts() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Low!id $mol_view sub / <= string!id
	 *  ```
	 **/
	@ $mol_mem_key
	Low( id : any ) {
		return (( obj )=>{
			obj.sub = () => [].concat( this.string(id) )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  string!id \
	 *  ```
	 **/
	string( id : any ) {
		return ""
	}

} }

