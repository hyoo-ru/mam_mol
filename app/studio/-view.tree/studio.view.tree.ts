namespace $ { export class $mol_app_studio extends $mol_book {

	/**
	 *  ```
	 *  value_overrided!id?val null
	 *  ```
	 **/
	@ $mol_mem_key
	value_overrided( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  tools_main /
	 *  ```
	 **/
	tools_main() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  pages /
	 *  	<= Preview_page
	 *  	<= Editor_page
	 *  	<= Source_page
	 *  ```
	 **/
	pages() {
		return [this.Preview_page() , this.Editor_page() , this.Source_page()] as readonly any[]
	}

	/**
	 *  ```
	 *  Preview_page $mol_page
	 *  	title <= preview_title
	 *  	tools <= preview_tools
	 *  	body / <= Selector
	 *  	minimal_width 400
	 *  ```
	 **/
	@ $mol_mem
	Preview_page() {
		return (( obj )=>{
			obj.title = () => this.preview_title()
			obj.tools = () => this.preview_tools()
			obj.body = () => [this.Selector()] as readonly any[]
			obj.minimal_width = () => 400
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  preview_title @ \Preview:
	 *  ```
	 **/
	preview_title() {
		return this.$.$mol_locale.text( "$mol_app_studio_preview_title" )
	}

	/**
	 *  ```
	 *  preview_tools /
	 *  	<= Source_link
	 *  	<= Edit
	 *  ```
	 **/
	preview_tools() {
		return [this.Source_link() , this.Edit()] as readonly any[]
	}

	/**
	 *  ```
	 *  Source_link $mol_link
	 *  	hint <= source_title
	 *  	sub / <= Source_icon
	 *  	arg <= source_arg
	 *  ```
	 **/
	@ $mol_mem
	Source_link() {
		return (( obj )=>{
			obj.hint = () => this.source_title()
			obj.sub = () => [this.Source_icon()] as readonly any[]
			obj.arg = () => this.source_arg()
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Source_icon $mol_icon_source
	 *  ```
	 **/
	@ $mol_mem
	Source_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_source(  ) )
	}

	/**
	 *  ```
	 *  source_arg *
	 *  	source \
	 *  	path null
	 *  ```
	 **/
	source_arg() {
		return ({
			"source" :  "" ,
			"path" :  null as any ,
		})
	}

	/**
	 *  ```
	 *  Edit $mol_link
	 *  	hint <= editor_title
	 *  	sub / <= Edit_icon
	 *  	arg *
	 *  		path \
	 *  		source null
	 *  ```
	 **/
	@ $mol_mem
	Edit() {
		return (( obj )=>{
			obj.hint = () => this.editor_title()
			obj.sub = () => [this.Edit_icon()] as readonly any[]
			obj.arg = () => ({
			"path" :  "" ,
			"source" :  null as any ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Edit_icon $mol_icon_settings
	 *  ```
	 **/
	@ $mol_mem
	Edit_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_settings(  ) )
	}

	/**
	 *  ```
	 *  Selector $mol_app_studio_selector
	 *  	sub / <= Block
	 *  	path?val <=> path?val
	 *  ```
	 **/
	@ $mol_mem
	Selector() {
		return (( obj )=>{
			obj.sub = () => [this.Block()] as readonly any[]
			obj.path = ( val? : any ) => this.path( val )
			return obj
		})( new this.$.$mol_app_studio_selector(  ) )
	}

	/**
	 *  ```
	 *  Block $mol_view
	 *  ```
	 **/
	@ $mol_mem
	Block() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  path?val /
	 *  ```
	 **/
	@ $mol_mem
	path( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [] as readonly any[]
	}

	/**
	 *  ```
	 *  Editor_page $mol_page
	 *  	plugins / <= Speech_filter
	 *  	title <= editor_title
	 *  	event_top?val <=> event_front_up?val
	 *  	tools / <= Editor_close
	 *  	body /
	 *  		<= Filter_bar
	 *  		<= Fields
	 *  	minimal_width 400
	 *  ```
	 **/
	@ $mol_mem
	Editor_page() {
		return (( obj )=>{
			obj.plugins = () => [this.Speech_filter()] as readonly any[]
			obj.title = () => this.editor_title()
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			obj.tools = () => [this.Editor_close()] as readonly any[]
			obj.body = () => [this.Filter_bar() , this.Fields()] as readonly any[]
			obj.minimal_width = () => 400
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  Speech_filter $mol_speech
	 *  	event_catch?val <=> speech_filter?val
	 *  	patterns <= speech_filter_patterns
	 *  ```
	 **/
	@ $mol_mem
	Speech_filter() {
		return (( obj )=>{
			obj.event_catch = ( val? : any ) => this.speech_filter( val )
			obj.patterns = () => this.speech_filter_patterns()
			return obj
		})( new this.$.$mol_speech(  ) )
	}

	/**
	 *  ```
	 *  speech_filter?val null
	 *  ```
	 **/
	@ $mol_mem
	speech_filter( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  speech_filter_patterns / \find (.+?)
	 *  ```
	 **/
	speech_filter_patterns() {
		return ["find (.+?)"] as readonly any[]
	}

	/**
	 *  ```
	 *  editor_title @ \Properties
	 *  ```
	 **/
	editor_title() {
		return this.$.$mol_locale.text( "$mol_app_studio_editor_title" )
	}

	/**
	 *  ```
	 *  Editor_close $mol_link
	 *  	sub / <= Editor_close_icon
	 *  	arg <= editor_close_arg
	 *  ```
	 **/
	@ $mol_mem
	Editor_close() {
		return (( obj )=>{
			obj.sub = () => [this.Editor_close_icon()] as readonly any[]
			obj.arg = () => this.editor_close_arg()
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Editor_close_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Editor_close_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  editor_close_arg * path null
	 *  ```
	 **/
	editor_close_arg() {
		return ({
			"path" :  null as any ,
		})
	}

	/**
	 *  ```
	 *  Filter_bar $mol_bar sub <= filter_bar_items
	 *  ```
	 **/
	@ $mol_mem
	Filter_bar() {
		return (( obj )=>{
			obj.sub = () => this.filter_bar_items()
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  filter_bar_items /
	 *  	<= Filter
	 *  	<= Prop_add
	 *  ```
	 **/
	filter_bar_items() {
		return [this.Filter() , this.Prop_add()] as readonly any[]
	}

	/**
	 *  ```
	 *  Filter $mol_search
	 *  	hint <= filter_hint
	 *  	query?val <=> prop_filter?val
	 *  ```
	 **/
	@ $mol_mem
	Filter() {
		return (( obj )=>{
			obj.hint = () => this.filter_hint()
			obj.query = ( val? : any ) => this.prop_filter( val )
			return obj
		})( new this.$.$mol_search(  ) )
	}

	/**
	 *  ```
	 *  filter_hint @ \Filter properties
	 *  ```
	 **/
	filter_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_filter_hint" )
	}

	/**
	 *  ```
	 *  prop_filter?val \
	 *  ```
	 **/
	@ $mol_mem
	prop_filter( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Prop_add $mol_button_minor
	 *  	event_click?val <=> event_add?val
	 *  	sub / <= Prop_add_icon
	 *  	hint <= prop_add_hint
	 *  ```
	 **/
	@ $mol_mem
	Prop_add() {
		return (( obj )=>{
			obj.event_click = ( val? : any ) => this.event_add( val )
			obj.sub = () => [this.Prop_add_icon()] as readonly any[]
			obj.hint = () => this.prop_add_hint()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  event_add?val null
	 *  ```
	 **/
	@ $mol_mem
	event_add( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Prop_add_icon $mol_icon_plus
	 *  ```
	 **/
	@ $mol_mem
	Prop_add_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_plus(  ) )
	}

	/**
	 *  ```
	 *  prop_add_hint @ \Add this property
	 *  ```
	 **/
	prop_add_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_prop_add_hint" )
	}

	/**
	 *  ```
	 *  Fields $mol_list rows <= fields
	 *  ```
	 **/
	@ $mol_mem
	Fields() {
		return (( obj )=>{
			obj.rows = () => this.fields()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  fields /
	 *  ```
	 **/
	fields() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Source_page $mol_page
	 *  	title <= source_title
	 *  	minimal_width 400
	 *  	tools / <= Source_close
	 *  	body / <= Source
	 *  ```
	 **/
	@ $mol_mem
	Source_page() {
		return (( obj )=>{
			obj.title = () => this.source_title()
			obj.minimal_width = () => 400
			obj.tools = () => [this.Source_close()] as readonly any[]
			obj.body = () => [this.Source()] as readonly any[]
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  source_title @ \Source code
	 *  ```
	 **/
	source_title() {
		return this.$.$mol_locale.text( "$mol_app_studio_source_title" )
	}

	/**
	 *  ```
	 *  Source_close $mol_link
	 *  	sub / <= Source_close_icon
	 *  	arg <= source_close_arg
	 *  ```
	 **/
	@ $mol_mem
	Source_close() {
		return (( obj )=>{
			obj.sub = () => [this.Source_close_icon()] as readonly any[]
			obj.arg = () => this.source_close_arg()
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Source_close_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Source_close_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  source_close_arg * source null
	 *  ```
	 **/
	source_close_arg() {
		return ({
			"source" :  null as any ,
		})
	}

	/**
	 *  ```
	 *  Source $mol_text text <= source
	 *  ```
	 **/
	@ $mol_mem
	Source() {
		return (( obj )=>{
			obj.text = () => this.source()
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  source \
	 *  ```
	 **/
	source() {
		return ""
	}

	/**
	 *  ```
	 *  Placeholder null
	 *  ```
	 **/
	Placeholder() {
		return null as any
	}

	/**
	 *  ```
	 *  Prop!id $mol_app_studio_field
	 *  	path <= prop_path!id
	 *  	prop!path?val <=> prop_default!path?val
	 *  	props!name?val <=> props_all!name?val
	 *  	prop_arg!id <= prop_arg!id
	 *  	prop_value!id <= prop_value_base!id
	 *  	bind_options <= prop_options
	 *  	object_options <= view_options
	 *  	prop_add?val <=> prop_add?val
	 *  	highlight <= prop_filter
	 *  ```
	 **/
	@ $mol_mem_key
	Prop( id : any ) {
		return (( obj )=>{
			obj.path = () => this.prop_path(id)
			obj.prop = ( path : any , val? : any ) => this.prop_default(path , val )
			obj.props = ( name : any , val? : any ) => this.props_all(name , val )
			obj.prop_arg = ( id : any ) => this.prop_arg(id)
			obj.prop_value = ( id : any ) => this.prop_value_base(id)
			obj.bind_options = () => this.prop_options()
			obj.object_options = () => this.view_options()
			obj.prop_add = ( val? : any ) => this.prop_add( val )
			obj.highlight = () => this.prop_filter()
			return obj
		})( new this.$.$mol_app_studio_field(  ) )
	}

	/**
	 *  ```
	 *  prop_path!id /
	 *  ```
	 **/
	prop_path( id : any ) {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  prop_default!path?val $mol_tree
	 *  ```
	 **/
	@ $mol_mem_key
	prop_default( path : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_tree(  ) )
	}

	/**
	 *  ```
	 *  props_all!name?val $mol_tree
	 *  ```
	 **/
	@ $mol_mem_key
	props_all( name : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_tree(  ) )
	}

	/**
	 *  ```
	 *  prop_arg!id *
	 *  ```
	 **/
	prop_arg( id : any ) {
		return ({
		})
	}

	/**
	 *  ```
	 *  prop_value_base!id null
	 *  ```
	 **/
	prop_value_base( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  prop_options /
	 *  ```
	 **/
	prop_options() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  view_options /
	 *  ```
	 **/
	view_options() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  prop_add?val \
	 *  ```
	 **/
	@ $mol_mem
	prop_add( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  class_name_self?val \App
	 *  ```
	 **/
	@ $mol_mem
	class_name_self( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "App"
	}

	/**
	 *  ```
	 *  class_name_base?val \$mol_view
	 *  ```
	 **/
	@ $mol_mem
	class_name_base( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "$mol_view"
	}

	/**
	 *  ```
	 *  class_self?val $mol_tree
	 *  ```
	 **/
	@ $mol_mem
	class_self( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_tree(  ) )
	}

	/**
	 *  ```
	 *  classes $mol_tree
	 *  ```
	 **/
	@ $mol_mem
	classes() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_tree(  ) )
	}

} }
namespace $ { export class $mol_app_studio_selector extends $mol_view {

	/**
	 *  ```
	 *  event *
	 *  	contextmenu?event <=> select?event
	 *  	dblclick?event <=> select?event
	 *  ```
	 **/
	event() {
		return ({
			"contextmenu" :  ( event? : any )=>  this.select( event ) ,
			"dblclick" :  ( event? : any )=>  this.select( event ) ,
		})
	}

	/**
	 *  ```
	 *  select?event null
	 *  ```
	 **/
	@ $mol_mem
	select( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  path?val /
	 *  ```
	 **/
	@ $mol_mem
	path( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [] as readonly any[]
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/app/studio/-view.tree/studio.view.tree.map