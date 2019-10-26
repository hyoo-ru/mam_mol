namespace $ { export class $mol_app_jsperf extends $mol_page {

	/**
	 *  ```
	 *  title @ \JS Performance
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_title" )
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_theme \$mol_theme_dark
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_theme" :  "$mol_theme_dark" ,
		})
	}

	/**
	 *  ```
	 *  body /
	 *  	<= Prefix
	 *  	<= Cases
	 *  	<= Chart
	 *  	<= Postfix
	 *  ```
	 **/
	body() {
		return [ this.Prefix() , this.Cases() , this.Chart() , this.Postfix() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Prefix $mol_textarea
	 *  	value?val <=> prefix?val
	 *  	hint <= prefix_hint
	 *  ```
	 **/
	@ $mol_mem
	Prefix() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.prefix( val )
			obj.hint = () => this.prefix_hint()
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  prefix?val \
	 *  ```
	 **/
	@ $mol_mem
	prefix( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  prefix_hint @ \Setup code for all cases. Use {#} to insert iterations count. Use  $mol_import.script( uri ) to load external.
	 *  ```
	 **/
	prefix_hint() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_prefix_hint" )
	}

	/**
	 *  ```
	 *  Cases $mol_view sub <= cases
	 *  ```
	 **/
	@ $mol_mem
	Cases() {
		return (( obj )=>{
			obj.sub = () => this.cases()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  cases /
	 *  ```
	 **/
	cases() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Chart $mol_plot_pane
	 *  	gap_bottom 0
	 *  	graphs /
	 *  		<= Frequencies
	 *  		<= Frequencies_ruler
	 *  		<= Frequencies_mark_hor
	 *  ```
	 **/
	@ $mol_mem
	Chart() {
		return (( obj )=>{
			obj.gap_bottom = () => 0
			obj.graphs = () => [ this.Frequencies() , this.Frequencies_ruler() , this.Frequencies_mark_hor() ] as readonly any[]
			return obj
		})( new this.$.$mol_plot_pane(  ) )
	}

	/**
	 *  ```
	 *  Frequencies $mol_plot_bar series_y <= frequencies
	 *  ```
	 **/
	@ $mol_mem
	Frequencies() {
		return (( obj )=>{
			obj.series_y = () => this.frequencies()
			return obj
		})( new this.$.$mol_plot_bar(  ) )
	}

	/**
	 *  ```
	 *  frequencies /number
	 *  ```
	 **/
	frequencies() {
		return [  ] as readonly ( number )[]
	}

	/**
	 *  ```
	 *  Frequencies_ruler $mol_plot_ruler_vert title \
	 *  ```
	 **/
	@ $mol_mem
	Frequencies_ruler() {
		return (( obj )=>{
			obj.title = () => ""
			return obj
		})( new this.$.$mol_plot_ruler_vert(  ) )
	}

	/**
	 *  ```
	 *  Frequencies_mark_hor $mol_plot_mark_hor
	 *  	title \
	 *  	labels <= labels
	 *  ```
	 **/
	@ $mol_mem
	Frequencies_mark_hor() {
		return (( obj )=>{
			obj.title = () => ""
			obj.labels = () => this.labels()
			return obj
		})( new this.$.$mol_plot_mark_hor(  ) )
	}

	/**
	 *  ```
	 *  labels /string
	 *  ```
	 **/
	labels() {
		return [  ] as readonly ( string )[]
	}

	/**
	 *  ```
	 *  Postfix $mol_textarea
	 *  	value?val <=> postfix?val
	 *  	hint <= postfix_hint
	 *  ```
	 **/
	@ $mol_mem
	Postfix() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.postfix( val )
			obj.hint = () => this.postfix_hint()
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  postfix?val \
	 *  ```
	 **/
	@ $mol_mem
	postfix( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  postfix_hint @ \Teardown code for all cases. Use {#} to insert iterations count.
	 *  ```
	 **/
	postfix_hint() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_postfix_hint" )
	}

	/**
	 *  ```
	 *  Case!index $mol_app_jsperf_case
	 *  	source?val <=> source!index?val
	 *  	results?val <=> results!index?val
	 *  ```
	 **/
	@ $mol_mem_key
	Case( index : any ) {
		return (( obj )=>{
			obj.source = ( val? : any ) => this.source(index , val )
			obj.results = ( val? : any ) => this.results(index , val )
			return obj
		})( new this.$.$mol_app_jsperf_case(  ) )
	}

	/**
	 *  ```
	 *  source!index?val \
	 *  ```
	 **/
	@ $mol_mem_key
	source( index : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  results!index?val \
	 *  ```
	 **/
	@ $mol_mem_key
	results( index : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  tools /
	 *  	<= Permalink
	 *  	<= New
	 *  	<= Optimized
	 *  	<= Run
	 *  ```
	 **/
	tools() {
		return [ this.Permalink() , this.New() , this.Optimized() , this.Run() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Permalink $mol_link
	 *  	uri <= permalink
	 *  	hint <= parmalink_hint
	 *  	target \_blank
	 *  	sub / <= Permalink_icon
	 *  ```
	 **/
	@ $mol_mem
	Permalink() {
		return (( obj )=>{
			obj.uri = () => this.permalink()
			obj.hint = () => this.parmalink_hint()
			obj.target = () => "_blank"
			obj.sub = () => [ this.Permalink_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  permalink \
	 *  ```
	 **/
	permalink() {
		return ""
	}

	/**
	 *  ```
	 *  parmalink_hint @ \Permamemnt short link
	 *  ```
	 **/
	parmalink_hint() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_parmalink_hint" )
	}

	/**
	 *  ```
	 *  Permalink_icon $mol_icon_external
	 *  ```
	 **/
	@ $mol_mem
	Permalink_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_external(  ) )
	}

	/**
	 *  ```
	 *  New $mol_link
	 *  	uri \#
	 *  	hint <= new_hint
	 *  	sub / <= New_icon
	 *  ```
	 **/
	@ $mol_mem
	New() {
		return (( obj )=>{
			obj.uri = () => "#"
			obj.hint = () => this.new_hint()
			obj.sub = () => [ this.New_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  new_hint @ \New benchmark
	 *  ```
	 **/
	new_hint() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_new_hint" )
	}

	/**
	 *  ```
	 *  New_icon $mol_icon_plus
	 *  ```
	 **/
	@ $mol_mem
	New_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_plus(  ) )
	}

	/**
	 *  ```
	 *  Optimized $mol_check_box
	 *  	title <= optimized_title
	 *  	checked?val <=> optimized?val
	 *  ```
	 **/
	@ $mol_mem
	Optimized() {
		return (( obj )=>{
			obj.title = () => this.optimized_title()
			obj.checked = ( val? : any ) => this.optimized( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  optimized_title @ \Optimized
	 *  ```
	 **/
	optimized_title() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_optimized_title" )
	}

	/**
	 *  ```
	 *  optimized?val true
	 *  ```
	 **/
	@ $mol_mem
	optimized( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/**
	 *  ```
	 *  Run $mol_button_major
	 *  	title <= run_title
	 *  	click?event <=> run?event
	 *  ```
	 **/
	@ $mol_mem
	Run() {
		return (( obj )=>{
			obj.title = () => this.run_title()
			obj.click = ( event? : any ) => this.run( event )
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  run_title @ \Run
	 *  ```
	 **/
	run_title() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_run_title" )
	}

	/**
	 *  ```
	 *  run?event null
	 *  ```
	 **/
	@ $mol_mem
	run( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }

namespace $ { export class $mol_app_jsperf_case extends $mol_view {

	/**
	 *  ```
	 *  results /
	 *  ```
	 **/
	results() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  sub <= columns
	 *  ```
	 **/
	sub() {
		return this.columns()
	}

	/**
	 *  ```
	 *  columns / <= Source
	 *  ```
	 **/
	columns() {
		return [ this.Source() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Source $mol_textarea
	 *  	value?val <=> source?val
	 *  	hint <= source_hint
	 *  ```
	 **/
	@ $mol_mem
	Source() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.source( val )
			obj.hint = () => this.source_hint()
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  source?val \
	 *  ```
	 **/
	@ $mol_mem
	source( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  source_hint @ \Case source code. Use {#} to insert iteration number.
	 *  ```
	 **/
	source_hint() {
		return this.$.$mol_locale.text( "$mol_app_jsperf_case_source_hint" )
	}

	/**
	 *  ```
	 *  Result!level $mol_app_jsperf_case_result result <= result!level
	 *  ```
	 **/
	@ $mol_mem_key
	Result( level : any ) {
		return (( obj )=>{
			obj.result = () => this.result(level)
			return obj
		})( new this.$.$mol_app_jsperf_case_result(  ) )
	}

	/**
	 *  ```
	 *  result!level $mol_app_jsperf_stats
	 *  ```
	 **/
	@ $mol_mem_key
	result( level : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_app_jsperf_stats(  ) )
	}

} }

namespace $ { export class $mol_app_jsperf_case_result extends $mol_view {

	/**
	 *  ```
	 *  result $mol_app_jsperf_stats
	 *  ```
	 **/
	@ $mol_mem
	result() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_app_jsperf_stats(  ) )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Stats
	 *  	<= Portion
	 *  	<= Error
	 *  ```
	 **/
	sub() {
		return [ this.Stats() , this.Portion() , this.Error() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Stats $mol_view sub /
	 *  	<= Frequency
	 *  	\ ≈ 
	 *  	<= Time
	 *  	\ ⋅ 
	 *  	<= Iterations
	 *  ```
	 **/
	@ $mol_mem
	Stats() {
		return (( obj )=>{
			obj.sub = () => [ this.Frequency() , " ≈ " , this.Time() , " ⋅ " , this.Iterations() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Frequency $mol_view sub / <= frequency
	 *  ```
	 **/
	@ $mol_mem
	Frequency() {
		return (( obj )=>{
			obj.sub = () => [ this.frequency() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  frequency \
	 *  ```
	 **/
	frequency() {
		return ""
	}

	/**
	 *  ```
	 *  Time $mol_view sub / <= time
	 *  ```
	 **/
	@ $mol_mem
	Time() {
		return (( obj )=>{
			obj.sub = () => [ this.time() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  time \
	 *  ```
	 **/
	time() {
		return ""
	}

	/**
	 *  ```
	 *  Iterations $mol_view sub / <= iterations
	 *  ```
	 **/
	@ $mol_mem
	Iterations() {
		return (( obj )=>{
			obj.sub = () => [ this.iterations() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  iterations \
	 *  ```
	 **/
	iterations() {
		return ""
	}

	/**
	 *  ```
	 *  Portion $mol_portion portion <= portion
	 *  ```
	 **/
	@ $mol_mem
	Portion() {
		return (( obj )=>{
			obj.portion = () => this.portion()
			return obj
		})( new this.$.$mol_portion(  ) )
	}

	/**
	 *  ```
	 *  portion 0
	 *  ```
	 **/
	portion() {
		return 0
	}

	/**
	 *  ```
	 *  Error $mol_view sub / <= error
	 *  ```
	 **/
	@ $mol_mem
	Error() {
		return (( obj )=>{
			obj.sub = () => [ this.error() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  error \
	 *  ```
	 **/
	error() {
		return ""
	}

} }

