namespace $ { export class $mol_list_demo_tree extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Large list of rows with dynamic content
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_list_demo_tree_title" )
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
	 *  Scroll $mol_scroll sub / <= Content
	 *  ```
	 **/
	@ $mol_mem
	Scroll() {
		return (( obj )=>{
			obj.sub = () => [ this.Content() ] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Content $mol_list rows <= root_rows
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.rows = () => this.root_rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  root_rows /
	 *  ```
	 **/
	root_rows() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Row!id $mol_expander
	 *  	label / <= Row_title!id
	 *  	expanded?val <=> row_expanded!id?val
	 *  	Content <= Row_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row( id : any ) {
		return (( obj )=>{
			obj.label = () => [ this.Row_title(id) ] as readonly any[]
			obj.expanded = ( val? : any ) => this.row_expanded(id , val )
			obj.Content = () => this.Row_content(id)
			return obj
		})( new this.$.$mol_expander(  ) )
	}

	/**
	 *  ```
	 *  Row_title!id $mol_paragraph sub / <= row_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row_title( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.row_title(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  row_title!id \
	 *  ```
	 **/
	row_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  row_expanded!id?val false
	 *  ```
	 **/
	@ $mol_mem_key
	row_expanded( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Row_content!id $mol_list rows <= row_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row_content( id : any ) {
		return (( obj )=>{
			obj.rows = () => this.row_content(id)
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  row_content!id /
	 *  ```
	 **/
	row_content( id : any ) {
		return [  ] as readonly any[]
	}

} }

