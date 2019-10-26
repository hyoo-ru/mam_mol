namespace $ { export class $mol_app_bench extends $mol_view {

	/**
	 *  ```
	 *  sub /
	 *  	<= Sandbox_page
	 *  	<= Main_page
	 *  	<= Addon_page
	 *  ```
	 **/
	sub() {
		return [ this.Sandbox_page() , this.Main_page() , this.Addon_page() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Sandbox_page $mol_page
	 *  	title <= sandbox_title
	 *  	Body <= Sandbox
	 *  ```
	 **/
	@ $mol_mem
	Sandbox_page() {
		return (( obj )=>{
			obj.title = () => this.sandbox_title()
			obj.Body = () => this.Sandbox()
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  sandbox_title @ \Sandbox
	 *  ```
	 **/
	sandbox_title() {
		return this.$.$mol_locale.text( "$mol_app_bench_sandbox_title" )
	}

	/**
	 *  ```
	 *  Sandbox $mol_scroll dom_name \iframe
	 *  ```
	 **/
	@ $mol_mem
	Sandbox() {
		return (( obj )=>{
			obj.dom_name = () => "iframe"
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Main_page $mol_page
	 *  	title <= title
	 *  	body / <= Inform
	 *  ```
	 **/
	@ $mol_mem
	Main_page() {
		return (( obj )=>{
			obj.title = () => this.title()
			obj.body = () => [ this.Inform() ] as readonly any[]
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  Inform $mol_view sub /
	 *  	<= Descr_scroll
	 *  	<= Param_fields
	 *  	<= Result
	 *  ```
	 **/
	@ $mol_mem
	Inform() {
		return (( obj )=>{
			obj.sub = () => [ this.Descr_scroll() , this.Param_fields() , this.Result() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Descr_scroll $mol_scroll sub / <= Descr
	 *  ```
	 **/
	@ $mol_mem
	Descr_scroll() {
		return (( obj )=>{
			obj.sub = () => [ this.Descr() ] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Descr $mol_text text <= description
	 *  ```
	 **/
	@ $mol_mem
	Descr() {
		return (( obj )=>{
			obj.text = () => this.description()
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

	/**
	 *  ```
	 *  Param_fields $mol_row sub <= param_fields
	 *  ```
	 **/
	@ $mol_mem
	Param_fields() {
		return (( obj )=>{
			obj.sub = () => this.param_fields()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  param_fields /
	 *  ```
	 **/
	param_fields() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Result $mol_bench
	 *  	result <= result
	 *  	col_head_title!id <= result_col_title!id
	 *  	col_sort?val <=> result_col_sort?val
	 *  ```
	 **/
	@ $mol_mem
	Result() {
		return (( obj )=>{
			obj.result = () => this.result()
			obj.col_head_title = ( id : any ) => this.result_col_title(id)
			obj.col_sort = ( val? : any ) => this.result_col_sort( val )
			return obj
		})( new this.$.$mol_bench(  ) )
	}

	/**
	 *  ```
	 *  result null
	 *  ```
	 **/
	result() {
		return null as any
	}

	/**
	 *  ```
	 *  result_col_title!id \
	 *  ```
	 **/
	result_col_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  result_col_sort?val \
	 *  ```
	 **/
	@ $mol_mem
	result_col_sort( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Addon_page $mol_page
	 *  	title <= addon_title
	 *  	body /
	 *  		<= Filter
	 *  		<= Menu
	 *  ```
	 **/
	@ $mol_mem
	Addon_page() {
		return (( obj )=>{
			obj.title = () => this.addon_title()
			obj.body = () => [ this.Filter() , this.Menu() ] as readonly any[]
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  addon_title @ \Samples
	 *  ```
	 **/
	addon_title() {
		return this.$.$mol_locale.text( "$mol_app_bench_addon_title" )
	}

	/**
	 *  ```
	 *  Filter $mol_search query?val <=> filter?val
	 *  ```
	 **/
	@ $mol_mem
	Filter() {
		return (( obj )=>{
			obj.query = ( val? : any ) => this.filter( val )
			return obj
		})( new this.$.$mol_search(  ) )
	}

	/**
	 *  ```
	 *  filter?val \
	 *  ```
	 **/
	@ $mol_mem
	filter( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Menu $mol_list rows <= menu_options
	 *  ```
	 **/
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.rows = () => this.menu_options()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  menu_options /
	 *  ```
	 **/
	menu_options() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Menu_option!id $mol_check_box
	 *  	minimal_height 36
	 *  	checked?val <=> menu_option_checked!id?val
	 *  	title <= sample_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Menu_option( id : any ) {
		return (( obj )=>{
			obj.minimal_height = () => 36
			obj.checked = ( val? : any ) => this.menu_option_checked(id , val )
			obj.title = () => this.sample_title(id)
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  menu_option_checked!id?val false
	 *  ```
	 **/
	@ $mol_mem_key
	menu_option_checked( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  sample_title!id \
	 *  ```
	 **/
	sample_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Param!id $mol_labeler
	 *  	title <= param_title!id
	 *  	content / <= Param_value!id
	 *  ```
	 **/
	@ $mol_mem_key
	Param( id : any ) {
		return (( obj )=>{
			obj.title = () => this.param_title(id)
			obj.content = () => [ this.Param_value(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  param_title!id \
	 *  ```
	 **/
	param_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Param_value!id $mol_number
	 *  	value?val <=> param_value!id?val
	 *  	precision_change <= param_precision!id
	 *  	debounce 1000
	 *  ```
	 **/
	@ $mol_mem_key
	Param_value( id : any ) {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.param_value(id , val )
			obj.precision_change = () => this.param_precision(id)
			obj.debounce = () => 1000
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  param_value!id?val \
	 *  ```
	 **/
	@ $mol_mem_key
	param_value( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  param_precision!id 0
	 *  ```
	 **/
	param_precision( id : any ) {
		return 0
	}

	/**
	 *  ```
	 *  result_col_title_sample @ \Sample
	 *  ```
	 **/
	result_col_title_sample() {
		return this.$.$mol_locale.text( "$mol_app_bench_result_col_title_sample" )
	}

} }

