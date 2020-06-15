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
	 *  title \$mol libs for web ui
	 *  ```
	 **/
	title() {
		return "$mol libs for web ui"
	}

	/**
	 *  ```
	 *  project_uri \https://github.com/eigenmethod/mol/tree/master/
	 *  ```
	 **/
	project_uri() {
		return "https://github.com/eigenmethod/mol/tree/master/"
	}

	/**
	 *  ```
	 *  tools /
	 *  	<= Lights
	 *  	<= Project
	 *  ```
	 **/
	tools() {
		return [this.Lights() , this.Project()] as readonly any[]
	}

	/**
	 *  ```
	 *  Lights $mol_lights_toggle
	 *  ```
	 **/
	@ $mol_mem
	Lights() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_lights_toggle(  ) )
	}

	/**
	 *  ```
	 *  Project $mol_link_iconed
	 *  	uri <= project_uri
	 *  	title \
	 *  ```
	 **/
	@ $mol_mem
	Project() {
		return (( obj )=>{
			obj.uri = () => this.project_uri()
			obj.title = () => ""
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  body / <= Description
	 *  ```
	 **/
	body() {
		return [this.Description()] as readonly any[]
	}

	/**
	 *  ```
	 *  Description $mol_text
	 *  	text <= description
	 *  	uri_base <= project_uri
	 *  ```
	 **/
	@ $mol_mem
	Description() {
		return (( obj )=>{
			obj.text = () => this.description()
			obj.uri_base = () => this.project_uri()
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
