namespace $ { export class $mol_status extends $mol_view {

	/**
	 *  ```
	 *  status null
	 *  ```
	 **/
	status() {
		return null as any
	}

	/**
	 *  ```
	 *  minimal_height 24
	 *  ```
	 **/
	minimal_height() {
		return 24
	}

	/**
	 *  ```
	 *  minimal_width 0
	 *  ```
	 **/
	minimal_width() {
		return 0
	}

	/**
	 *  ```
	 *  sub / <= message
	 *  ```
	 **/
	sub() {
		return [].concat( this.message() )
	}

	/**
	 *  ```
	 *  message \
	 *  ```
	 **/
	message() {
		return ""
	}

} }

