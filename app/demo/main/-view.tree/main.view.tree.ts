namespace $ { export class $mol_app_demo_main extends $mol_page {

	/**
	 *  ```
	 *  minimal_width 400
	 *  ```
	 **/
	minimal_width() {
		return 400
	}

	/**
	 *  ```
	 *  body / <= Description
	 *  ```
	 **/
	body() {
		return [ this.Description() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Description $mol_text
	 *  	text <= description
	 *  	uri_base \https://github.com/eigenmethod/mol/
	 *  ```
	 **/
	@ $mol_mem
	Description() {
		return (( obj )=>{
			obj.text = () => this.description()
			obj.uri_base = () => "https://github.com/eigenmethod/mol/"
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  description \
	 *  ```
	 **/
	description() {
		return ""
	}

} }

