namespace $ { export class $mol_bench extends $mol_grid {

	/**
	 *  ```
	 *  records <= result
	 *  ```
	 **/
	records() {
		return this.result()
	}

	/**
	 *  ```
	 *  result *
	 *  ```
	 **/
	result() {
		return ({
		})
	}

	/**
	 *  ```
	 *  col_sort?val \
	 *  ```
	 **/
	@ $mol_mem
	col_sort( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Col_head!id $mol_bench_head
	 *  	event_click?val <=> event_sort_toggle!id?val
	 *  	sub <= col_head_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Col_head( id : any ) {
		return (( obj )=>{
			obj.event_click = ( val? : any ) => this.event_sort_toggle(id , val )
			obj.sub = () => this.col_head_content(id)
			return obj
		})( new this.$.$mol_bench_head(  ) )
	}

	/**
	 *  ```
	 *  event_sort_toggle!id?val null
	 *  ```
	 **/
	@ $mol_mem_key
	event_sort_toggle( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  col_head_content!id /
	 *  	<= col_head_label!id
	 *  	<= Col_head_sort!id
	 *  ```
	 **/
	col_head_content( id : any ) {
		return [].concat( this.col_head_label(id) , this.Col_head_sort(id) )
	}

	/**
	 *  ```
	 *  col_head_label!id /
	 *  ```
	 **/
	col_head_label( id : any ) {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Col_head_sort!id $mol_icon_sort_asc
	 *  ```
	 **/
	@ $mol_mem_key
	Col_head_sort( id : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_sort_asc(  ) )
	}

	/**
	 *  ```
	 *  cell_content_number!id /
	 *  	<= result_value!id
	 *  	<= Result_portion!id
	 *  ```
	 **/
	cell_content_number( id : any ) {
		return [].concat( this.result_value(id) , this.Result_portion(id) )
	}

	/**
	 *  ```
	 *  result_value!id \
	 *  ```
	 **/
	result_value( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Result_portion!id $mol_portion portion <= result_portion!id
	 *  ```
	 **/
	@ $mol_mem_key
	Result_portion( id : any ) {
		return (( obj )=>{
			obj.portion = () => this.result_portion(id)
			return obj
		})( new this.$.$mol_portion(  ) )
	}

	/**
	 *  ```
	 *  result_portion!id 0
	 *  ```
	 **/
	result_portion( id : any ) {
		return 0
	}

} }

namespace $ { export class $mol_bench_head extends $mol_float {

	/**
	 *  ```
	 *  horizontal false
	 *  ```
	 **/
	horizontal() {
		return false
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	click?val <=> event_click?val
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"click" :  ( val? : any )=>  this.event_click( val ) ,
		})
	}

	/**
	 *  ```
	 *  event_click?val null
	 *  ```
	 **/
	@ $mol_mem
	event_click( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	title <= hint
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"title" :  this.hint() ,
		})
	}

	/**
	 *  ```
	 *  hint @ \Click to sort by this column
	 *  ```
	 **/
	hint() {
		return this.$.$mol_locale.text( "$mol_bench_head_hint" )
	}

} }

