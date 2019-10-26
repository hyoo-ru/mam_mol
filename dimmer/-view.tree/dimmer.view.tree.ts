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
	 *  parts /$mol_view_content
	 *  ```
	 **/
	parts() {
		return [  ] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Low!id $mol_view sub / <= string!id
	 *  ```
	 **/
	@ $mol_mem_key
	Low( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.string(id) ] as readonly any[]
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

