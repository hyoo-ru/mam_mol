namespace $ { export class $mol_frame extends $mol_view {

	/**
	 *  ```
	 *  dom_name \iframe
	 *  ```
	 **/
	dom_name() {
		return "iframe"
	}

	/**
	 *  ```
	 *  attr * src <= uri
	 *  ```
	 **/
	attr() {
		return ({
			"src" :  this.uri() ,
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
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/frame/-view.tree/frame.view.tree.map