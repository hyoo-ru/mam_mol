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
	 *  attr *
	 *  	src <= uri
	 *  	allow \
	 *  	allowfullscreen <= fullscreen
	 *  ```
	 **/
	attr() {
		return ({
			"src" :  this.uri() ,
			"allow" :  "" ,
			"allowfullscreen" :  this.fullscreen() ,
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

	/**
	 *  ```
	 *  fullscreen true
	 *  ```
	 **/
	fullscreen() {
		return true
	}

	/**
	 *  ```
	 *  accelerometer true
	 *  ```
	 **/
	accelerometer() {
		return true
	}

	/**
	 *  ```
	 *  autoplay true
	 *  ```
	 **/
	autoplay() {
		return true
	}

	/**
	 *  ```
	 *  encription true
	 *  ```
	 **/
	encription() {
		return true
	}

	/**
	 *  ```
	 *  gyroscope true
	 *  ```
	 **/
	gyroscope() {
		return true
	}

	/**
	 *  ```
	 *  pip true
	 *  ```
	 **/
	pip() {
		return true
	}

} }
