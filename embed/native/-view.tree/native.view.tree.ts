namespace $ { export class $mol_embed_native extends $mol_view {

	/**
	 *  ```
	 *  dom_name \object
	 *  ```
	 **/
	dom_name() {
		return "object"
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	data <= uri
	 *  	type <= mime
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"data" :  this.uri() ,
			"type" :  this.mime() ,
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
	 *  mime \
	 *  ```
	 **/
	mime() {
		return ""
	}

	/**
	 *  ```
	 *  sub / <= Open
	 *  ```
	 **/
	sub() {
		return [].concat( this.Open() )
	}

	/**
	 *  ```
	 *  Open $mol_link
	 *  	uri <= uri
	 *  	sub / <= Open_button
	 *  ```
	 **/
	@ $mol_mem
	Open() {
		return (( obj )=>{
			obj.uri = () => this.uri()
			obj.sub = () => [].concat( this.Open_button() )
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Open_button $mol_button_major title <= open_label
	 *  ```
	 **/
	@ $mol_mem
	Open_button() {
		return (( obj )=>{
			obj.title = () => this.open_label()
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  open_label @ \Open
	 *  ```
	 **/
	open_label() {
		return this.$.$mol_locale.text( "$mol_embed_native_open_label" )
	}

} }

