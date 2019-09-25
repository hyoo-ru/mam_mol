namespace $ { export class $mol_app_bench_list_mol extends $mol_scroll {

	/**
	 *  ```
	 *  sub / <= List
	 *  ```
	 **/
	sub() {
		return [].concat( this.List() )
	}

	/**
	 *  ```
	 *  List $mol_list rows / <= rows
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => [].concat( this.rows() )
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  rows /
	 *  ```
	 **/
	rows() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Row!id $mol_app_bench_list_mol_row
	 *  	checked?val <=> row_selected!id?val
	 *  	title <= row_title!id
	 *  	content <= row_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row( id : any ) {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.row_selected(id , val )
			obj.title = () => this.row_title(id)
			obj.content = () => this.row_content(id)
			return obj
		})( new this.$.$mol_app_bench_list_mol_row(  ) )
	}

	/**
	 *  ```
	 *  row_selected!id?val false
	 *  ```
	 **/
	@ $mol_mem_key
	row_selected( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
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
	 *  row_content!id \
	 *  ```
	 **/
	row_content( id : any ) {
		return ""
	}

} }

namespace $ { export class $mol_app_bench_list_mol_row extends $mol_check {

	/**
	 *  ```
	 *  selected?val false
	 *  ```
	 **/
	@ $mol_mem
	selected( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  minimal_height 56
	 *  ```
	 **/
	minimal_height() {
		return 56
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Title
	 *  	<= Content
	 *  ```
	 **/
	sub() {
		return [].concat( this.Title() , this.Content() )
	}

	/**
	 *  ```
	 *  Title $mol_view sub / <= title
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.title() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  title \
	 *  ```
	 **/
	title() {
		return ""
	}

	/**
	 *  ```
	 *  Content $mol_view sub / <= content
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.content() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  content \
	 *  ```
	 **/
	content() {
		return ""
	}

} }

