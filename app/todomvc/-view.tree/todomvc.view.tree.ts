namespace $ { export class $mol_app_todomvc extends $mol_scroll {

	/**
	 *  ```
	 *  title \Todos
	 *  ```
	 **/
	title() {
		return "Todos"
	}

	/**
	 *  ```
	 *  sub / <= Page
	 *  ```
	 **/
	sub() {
		return [ this.Page() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Page $mol_list rows /
	 *  	<= Title
	 *  	<= Panel
	 *  ```
	 **/
	@ $mol_mem
	Page() {
		return (( obj )=>{
			obj.rows = () => [ this.Title() , this.Panel() ] as readonly any[]
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  Title $mol_view
	 *  	minimal_height 176
	 *  	sub / <= title
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.minimal_height = () => 176
			obj.sub = () => [ this.title() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Panel $mol_list rows <= panels
	 *  ```
	 **/
	@ $mol_mem
	Panel() {
		return (( obj )=>{
			obj.rows = () => this.panels()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  panels /
	 *  	<= Head
	 *  	<= List
	 *  	<= Foot
	 *  ```
	 **/
	panels() {
		return [ this.Head() , this.List() , this.Foot() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Head $mol_view
	 *  	minimal_height 64
	 *  	sub <= Head_content
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.minimal_height = () => 64
			obj.sub = () => this.Head_content()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Head_content /
	 *  	<= Head_complete
	 *  	<= Add
	 *  ```
	 **/
	Head_content() {
		return [ this.Head_complete() , this.Add() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Head_complete $mol_check
	 *  	enabled <= head_complete_enabled
	 *  	checked?val <=> completed_all?val
	 *  	title \❯
	 *  ```
	 **/
	@ $mol_mem
	Head_complete() {
		return (( obj )=>{
			obj.enabled = () => this.head_complete_enabled()
			obj.checked = ( val? : any ) => this.completed_all( val )
			obj.title = () => "❯"
			return obj
		})( new this.$.$mol_check(  ) )
	}

	/**
	 *  ```
	 *  head_complete_enabled false
	 *  ```
	 **/
	head_complete_enabled() {
		return false
	}

	/**
	 *  ```
	 *  completed_all?val false
	 *  ```
	 **/
	@ $mol_mem
	completed_all( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Add $mol_app_todomvc_add
	 *  	value?val <=> task_title_new?val
	 *  	event_done?event <=> event_add?event
	 *  ```
	 **/
	@ $mol_mem
	Add() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.task_title_new( val )
			obj.event_done = ( event? : any ) => this.event_add( event )
			return obj
		})( new this.$.$mol_app_todomvc_add(  ) )
	}

	/**
	 *  ```
	 *  task_title_new?val \
	 *  ```
	 **/
	@ $mol_mem
	task_title_new( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  event_add?event null
	 *  ```
	 **/
	@ $mol_mem
	event_add( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  List $mol_list rows <= task_rows
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => this.task_rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  task_rows /$mol_view
	 *  ```
	 **/
	task_rows() {
		return [  ] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Foot $mol_view sub <= foot_content
	 *  ```
	 **/
	@ $mol_mem
	Foot() {
		return (( obj )=>{
			obj.sub = () => this.foot_content()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  foot_content /
	 *  	<= Pending
	 *  	<= Filter
	 *  	<= Sweep
	 *  ```
	 **/
	foot_content() {
		return [ this.Pending() , this.Filter() , this.Sweep() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Pending $mol_view sub / <= pending_message
	 *  ```
	 **/
	@ $mol_mem
	Pending() {
		return (( obj )=>{
			obj.sub = () => [ this.pending_message() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  pending_message \0 items left
	 *  ```
	 **/
	pending_message() {
		return "0 items left "
	}

	/**
	 *  ```
	 *  Filter $mol_bar sub <= filterOptions
	 *  ```
	 **/
	@ $mol_mem
	Filter() {
		return (( obj )=>{
			obj.sub = () => this.filterOptions()
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  filterOptions /
	 *  	<= Filter_all
	 *  	<= Filter_active
	 *  	<= Filter_completed
	 *  ```
	 **/
	filterOptions() {
		return [ this.Filter_all() , this.Filter_active() , this.Filter_completed() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Filter_all $mol_link
	 *  	sub / <= filter_all_label
	 *  	arg * completed null
	 *  ```
	 **/
	@ $mol_mem
	Filter_all() {
		return (( obj )=>{
			obj.sub = () => [ this.filter_all_label() ] as readonly any[]
			obj.arg = () => ({
			"completed" :  null as any ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  filter_all_label \All
	 *  ```
	 **/
	filter_all_label() {
		return "All"
	}

	/**
	 *  ```
	 *  Filter_active $mol_link
	 *  	sub / <= filter_active_label
	 *  	arg * completed \false
	 *  ```
	 **/
	@ $mol_mem
	Filter_active() {
		return (( obj )=>{
			obj.sub = () => [ this.filter_active_label() ] as readonly any[]
			obj.arg = () => ({
			"completed" :  "false" ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  filter_active_label \Active
	 *  ```
	 **/
	filter_active_label() {
		return "Active"
	}

	/**
	 *  ```
	 *  Filter_completed $mol_link
	 *  	sub / <= filter_completed_label
	 *  	arg * completed \true
	 *  ```
	 **/
	@ $mol_mem
	Filter_completed() {
		return (( obj )=>{
			obj.sub = () => [ this.filter_completed_label() ] as readonly any[]
			obj.arg = () => ({
			"completed" :  "true" ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  filter_completed_label \Completed
	 *  ```
	 **/
	filter_completed_label() {
		return "Completed"
	}

	/**
	 *  ```
	 *  Sweep $mol_button_minor
	 *  	enabled <= sweep_enabled
	 *  	event_click?event <=> event_sweep?event
	 *  	sub / <= sweep_label
	 *  ```
	 **/
	@ $mol_mem
	Sweep() {
		return (( obj )=>{
			obj.enabled = () => this.sweep_enabled()
			obj.event_click = ( event? : any ) => this.event_sweep( event )
			obj.sub = () => [ this.sweep_label() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  sweep_enabled true
	 *  ```
	 **/
	sweep_enabled() {
		return true
	}

	/**
	 *  ```
	 *  event_sweep?event null
	 *  ```
	 **/
	@ $mol_mem
	event_sweep( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  sweep_label \Clear completed
	 *  ```
	 **/
	sweep_label() {
		return "Clear completed"
	}

	/**
	 *  ```
	 *  Task_row!id $mol_app_todomvc_task_row
	 *  	completed?val <=> task_completed!id?val
	 *  	title?val <=> task_title!id?val
	 *  	event_drop?event <=> event_task_drop!id?event
	 *  ```
	 **/
	@ $mol_mem_key
	Task_row( id : any ) {
		return (( obj )=>{
			obj.completed = ( val? : any ) => this.task_completed(id , val )
			obj.title = ( val? : any ) => this.task_title(id , val )
			obj.event_drop = ( event? : any ) => this.event_task_drop(id , event )
			return obj
		})( new this.$.$mol_app_todomvc_task_row(  ) )
	}

	/**
	 *  ```
	 *  task_completed!id?val false
	 *  ```
	 **/
	@ $mol_mem_key
	task_completed( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  task_title!id?val \
	 *  ```
	 **/
	@ $mol_mem_key
	task_title( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  event_task_drop!id?event null
	 *  ```
	 **/
	@ $mol_mem_key
	event_task_drop( id : any , event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }

namespace $ { export class $mol_app_todomvc_add extends $mol_string {

	/**
	 *  ```
	 *  hint \What needs to be done?
	 *  ```
	 **/
	hint() {
		return "What needs to be done?"
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	keydown?event <=> event_press?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"keydown" :  ( event? : any )=>  this.event_press( event ) ,
		})
	}

	/**
	 *  ```
	 *  event_press?event null
	 *  ```
	 **/
	@ $mol_mem
	event_press( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_done?event null
	 *  ```
	 **/
	@ $mol_mem
	event_done( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }

namespace $ { export class $mol_app_todomvc_task_row extends $mol_view {

	/**
	 *  ```
	 *  minimal_height 64
	 *  ```
	 **/
	minimal_height() {
		return 64
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Complete
	 *  	<= Title
	 *  	<= Drop
	 *  ```
	 **/
	sub() {
		return [ this.Complete() , this.Title() , this.Drop() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Complete $mol_check checked?val <=> completed?val
	 *  ```
	 **/
	@ $mol_mem
	Complete() {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.completed( val )
			return obj
		})( new this.$.$mol_check(  ) )
	}

	/**
	 *  ```
	 *  completed?val false
	 *  ```
	 **/
	@ $mol_mem
	completed( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Title $mol_string
	 *  	hint <= title_hint
	 *  	value?val <=> title?val
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.hint = () => this.title_hint()
			obj.value = ( val? : any ) => this.title( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  title_hint \Task title
	 *  ```
	 **/
	title_hint() {
		return "Task title"
	}

	/**
	 *  ```
	 *  title?val \
	 *  ```
	 **/
	@ $mol_mem
	title( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Drop $mol_button_typed
	 *  	sub / \✖
	 *  	event_click?event <=> event_drop?event
	 *  ```
	 **/
	@ $mol_mem
	Drop() {
		return (( obj )=>{
			obj.sub = () => [ "✖" ] as readonly any[]
			obj.event_click = ( event? : any ) => this.event_drop( event )
			return obj
		})( new this.$.$mol_button_typed(  ) )
	}

	/**
	 *  ```
	 *  event_drop?event null
	 *  ```
	 **/
	@ $mol_mem
	event_drop( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_app_todomvc_task_row_completed <= completed?val
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_app_todomvc_task_row_completed" :  this.completed() ,
		})
	}

} }

