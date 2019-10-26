namespace $ { export class $mol_list_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Large list of rows with dynamic content
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_list_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Scroll
	 *  ```
	 **/
	sub() {
		return [ this.Scroll() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Scroll $mol_scroll sub / <= List
	 *  ```
	 **/
	@ $mol_mem
	Scroll() {
		return (( obj )=>{
			obj.sub = () => [ this.List() ] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  List $mol_list rows <= rows
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => this.rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  rows /
	 *  ```
	 **/
	rows() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Row!id $mol_expander
	 *  	title <= row_text!id
	 *  	content / <= Content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row( id : any ) {
		return (( obj )=>{
			obj.title = () => this.row_text(id)
			obj.content = () => [ this.Content(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_expander(  ) )
	}

	/**
	 *  ```
	 *  row_text!id \
	 *  ```
	 **/
	row_text( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Content!id $mol_row sub / <= Text
	 *  ```
	 **/
	@ $mol_mem_key
	Content( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.Text() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Text $mol_filler
	 *  ```
	 **/
	@ $mol_mem
	Text() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_filler(  ) )
	}

} }

