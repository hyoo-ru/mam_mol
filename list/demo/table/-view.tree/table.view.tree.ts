namespace $ { export class $mol_list_demo_table extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Large list of rows with dynamic content
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_list_demo_table_title" )
	}

	/**
	 *  ```
	 *  count 100
	 *  ```
	 **/
	count() {
		return 100
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
	 *  Scroll $mol_scroll sub / <= Rows
	 *  ```
	 **/
	@ $mol_mem
	Scroll() {
		return (( obj )=>{
			obj.sub = () => [ this.Rows() ] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Rows $mol_list rows <= rows
	 *  ```
	 **/
	@ $mol_mem
	Rows() {
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
	 *  Row!id $mol_row sub <= row_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.row_content(id)
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  row_content!id /
	 *  	<= Id!id
	 *  	<= Title!id
	 *  	<= Editable!id
	 *  	<= Priority!id
	 *  	<= Date!id
	 *  	<= Number!id
	 *  	<= Link!id
	 *  ```
	 **/
	row_content( id : any ) {
		return [ this.Id(id) , this.Title(id) , this.Editable(id) , this.Priority(id) , this.Date(id) , this.Number(id) , this.Link(id) ] as readonly any[]
	}

	/**
	 *  ```
	 *  Id!id $mol_view sub / <= row_id!id
	 *  ```
	 **/
	@ $mol_mem_key
	Id( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.row_id(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  row_id!id \
	 *  ```
	 **/
	row_id( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Title!id $mol_view sub / <= row_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Title( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.row_title(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
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
	 *  Editable!id $mol_check_box
	 *  	title <= editable_title
	 *  	checked?val <=> row_editable!id?val
	 *  ```
	 **/
	@ $mol_mem_key
	Editable( id : any ) {
		return (( obj )=>{
			obj.title = () => this.editable_title()
			obj.checked = ( val? : any ) => this.row_editable(id , val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  editable_title @ \Editable
	 *  ```
	 **/
	editable_title() {
		return this.$.$mol_locale.text( "$mol_list_demo_table_editable_title" )
	}

	/**
	 *  ```
	 *  row_editable!id?val false
	 *  ```
	 **/
	@ $mol_mem_key
	row_editable( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Priority!id $mol_switch
	 *  	enabled <= row_editable!id
	 *  	value?val <=> row_priority!id?val
	 *  	options *
	 *  		minor \Minor
	 *  		major \Major
	 *  		critical \Critical
	 *  ```
	 **/
	@ $mol_mem_key
	Priority( id : any ) {
		return (( obj )=>{
			obj.enabled = () => this.row_editable(id)
			obj.value = ( val? : any ) => this.row_priority(id , val )
			obj.options = () => ({
			"minor" :  "Minor" ,
			"major" :  "Major" ,
			"critical" :  "Critical" ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  row_priority!id?val \
	 *  ```
	 **/
	@ $mol_mem_key
	row_priority( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Date!id $mol_date
	 *  	value_moment?val <=> row_moment!id?val
	 *  	enabled <= row_editable!id
	 *  ```
	 **/
	@ $mol_mem_key
	Date( id : any ) {
		return (( obj )=>{
			obj.value_moment = ( val? : any ) => this.row_moment(id , val )
			obj.enabled = () => this.row_editable(id)
			return obj
		})( new this.$.$mol_date(  ) )
	}

	/**
	 *  ```
	 *  row_moment!id?val $mol_time_moment
	 *  ```
	 **/
	@ $mol_mem_key
	row_moment( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment(  ) )
	}

	/**
	 *  ```
	 *  Number!id $mol_number
	 *  	value?val <=> row_number!id?val
	 *  	enabled <= row_editable!id
	 *  ```
	 **/
	@ $mol_mem_key
	Number( id : any ) {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.row_number(id , val )
			obj.enabled = () => this.row_editable(id)
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  row_number!id?val 0
	 *  ```
	 **/
	@ $mol_mem_key
	row_number( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  Link!id $mol_link_iconed uri <= row_uri!id
	 *  ```
	 **/
	@ $mol_mem_key
	Link( id : any ) {
		return (( obj )=>{
			obj.uri = () => this.row_uri(id)
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  row_uri!id \
	 *  ```
	 **/
	row_uri( id : any ) {
		return ""
	}

} }

