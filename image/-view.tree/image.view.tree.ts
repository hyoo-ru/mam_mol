namespace $ { export class $mol_image extends $mol_view {

	/**
	 *  ```
	 *  dom_name \img
	 *  ```
	 **/
	dom_name() {
		return "img"
	}

	/**
	 *  ```
	 *  field *
	 *  	^
	 *  	src <= uri
	 *  	alt <= title
	 *  ```
	 **/
	field() {
		return ({
			...super.field() ,
			"src" :  this.uri() ,
			"alt" :  this.title() ,
		})
	}

	/**
	 *  ```
	 *  uri \
	 *  ```
	 **/
	uri() {
		return ""
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/image/-view.tree/image.view.tree.map