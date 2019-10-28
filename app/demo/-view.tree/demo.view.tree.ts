namespace $ { export class $mol_app_demo extends $mol_book {

	/**
	 *  ```
	 *  editor_title <= detail_title
	 *  ```
	 **/
	editor_title() {
		return this.detail_title()
	}

	/**
	 *  ```
	 *  detail_title \$mol
	 *  ```
	 **/
	detail_title() {
		return "$mol"
	}

	/**
	 *  ```
	 *  source_prefix \https://github.com/eigenmethod/mol/tree/master/
	 *  ```
	 **/
	source_prefix() {
		return "https://github.com/eigenmethod/mol/tree/master/"
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
	 *  Main $mol_app_demo_main event_top?event <=> event_front_up?event
	 *  ```
	 **/
	@ $mol_mem
	Main() {
		return (( obj )=>{
			obj.event_top = ( event? : any ) => this.event_front_up( event )
			return obj
		})( new this.$.$mol_app_demo_main(  ) )
	}

	/**
	 *  ```
	 *  pages <= blocks
	 *  ```
	 **/
	pages() {
		return this.blocks()
	}

	/**
	 *  ```
	 *  blocks /
	 *  ```
	 **/
	blocks() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  attr * mol_theme <= theme
	 *  ```
	 **/
	attr() {
		return ({
			"mol_theme" :  this.theme() ,
		})
	}

	/**
	 *  ```
	 *  Menu $mol_app_demo_menu
	 *  	hierarchy <= nav_hierarchy
	 *  	option!id <= nav_option!id
	 *  	filter?val <=> filter_string?val
	 *  	theme?val <=> theme?val
	 *  	event_top?event <=> event_front_up?event
	 *  ```
	 **/
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.hierarchy = () => this.nav_hierarchy()
			obj.option = ( id : any ) => this.nav_option(id)
			obj.filter = ( val? : any ) => this.filter_string( val )
			obj.theme = ( val? : any ) => this.theme( val )
			obj.event_top = ( event? : any ) => this.event_front_up( event )
			return obj
		})( new this.$.$mol_app_demo_menu(  ) )
	}

	/**
	 *  ```
	 *  nav_hierarchy null
	 *  ```
	 **/
	nav_hierarchy() {
		return null as any
	}

	/**
	 *  ```
	 *  nav_option!id null
	 *  ```
	 **/
	nav_option( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  filter_string?val \
	 *  ```
	 **/
	@ $mol_mem
	filter_string( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  theme?val \$mol_theme_dark
	 *  ```
	 **/
	@ $mol_mem
	theme( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "$mol_theme_dark"
	}

	/**
	 *  ```
	 *  Detail $mol_app_demo_detail
	 *  	minimal_width 600
	 *  	title <= detail_title
	 *  	source_link <= source_link
	 *  	body / <= Detail_list
	 *  	event_top?val <=> event_front_up?val
	 *  ```
	 **/
	@ $mol_mem
	Detail() {
		return (( obj )=>{
			obj.minimal_width = () => 600
			obj.title = () => this.detail_title()
			obj.source_link = () => this.source_link()
			obj.body = () => [ this.Detail_list() ] as readonly any[]
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			return obj
		})( new this.$.$mol_app_demo_detail(  ) )
	}

	/**
	 *  ```
	 *  source_link \
	 *  ```
	 **/
	source_link() {
		return ""
	}

	/**
	 *  ```
	 *  Detail_list $mol_list rows <= main_content
	 *  ```
	 **/
	@ $mol_mem
	Detail_list() {
		return (( obj )=>{
			obj.rows = () => this.main_content()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  main_content /
	 *  ```
	 **/
	main_content() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Editor!id $mol_app_studio
	 *  	minimal_width 1000
	 *  	title <= editor_title
	 *  	class_name_base <= selected_class_name
	 *  	tools_main / <= Close
	 *  ```
	 **/
	@ $mol_mem_key
	Editor( id : any ) {
		return (( obj )=>{
			obj.minimal_width = () => 1000
			obj.title = () => this.editor_title()
			obj.class_name_base = () => this.selected_class_name()
			obj.tools_main = () => [ this.Close() ] as readonly any[]
			return obj
		})( new this.$.$mol_app_studio(  ) )
	}

	/**
	 *  ```
	 *  selected_class_name \
	 *  ```
	 **/
	selected_class_name() {
		return ""
	}

	/**
	 *  ```
	 *  Close $mol_link
	 *  	sub / <= Close_icon
	 *  	arg <= close_arg
	 *  ```
	 **/
	@ $mol_mem
	Close() {
		return (( obj )=>{
			obj.sub = () => [ this.Close_icon() ] as readonly any[]
			obj.arg = () => this.close_arg()
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Close_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Close_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  close_arg * edit null
	 *  ```
	 **/
	close_arg() {
		return ({
			"edit" :  null as any ,
		})
	}

	/**
	 *  ```
	 *  Welcome $mol_scroll sub / <= Welcome_text
	 *  ```
	 **/
	@ $mol_mem
	Welcome() {
		return (( obj )=>{
			obj.sub = () => [ this.Welcome_text() ] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Welcome_text $mol_text text <= welcome_text
	 *  ```
	 **/
	@ $mol_mem
	Welcome_text() {
		return (( obj )=>{
			obj.text = () => this.welcome_text()
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  welcome_text \
	 *  ```
	 **/
	welcome_text() {
		return ""
	}

	/**
	 *  ```
	 *  Detail_empty_message $mol_status sub /
	 *  	<= detail_empty_prefix
	 *  	<= selected
	 *  	<= detail_empty_postfix
	 *  ```
	 **/
	@ $mol_mem
	Detail_empty_message() {
		return (( obj )=>{
			obj.sub = () => [ this.detail_empty_prefix() , this.selected() , this.detail_empty_postfix() ] as readonly any[]
			return obj
		})( new this.$.$mol_status(  ) )
	}

	/**
	 *  ```
	 *  detail_empty_prefix @ \No one demo with prefix "
	 *  ```
	 **/
	detail_empty_prefix() {
		return this.$.$mol_locale.text( "$mol_app_demo_detail_empty_prefix" )
	}

	/**
	 *  ```
	 *  selected \
	 *  ```
	 **/
	selected() {
		return ""
	}

	/**
	 *  ```
	 *  detail_empty_postfix @ \"
	 *  ```
	 **/
	detail_empty_postfix() {
		return this.$.$mol_locale.text( "$mol_app_demo_detail_empty_postfix" )
	}

} }

namespace $ { export class $mol_app_demo_menu extends $mol_page {

	/**
	 *  ```
	 *  minimal_width 240
	 *  ```
	 **/
	minimal_width() {
		return 240
	}

	/**
	 *  ```
	 *  title @ \$mol demonstrations
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_demo_menu_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Head
	 *  	<= Filter
	 *  	<= Nav
	 *  	<= Themes
	 *  ```
	 **/
	sub() {
		return [ this.Head() , this.Filter() , this.Nav() , this.Themes() ] as readonly any[]
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
	 *  Nav $mol_app_demo_nav
	 *  	hierarchy <= hierarchy
	 *  	record!id <= option!id
	 *  	needle <= filter?val
	 *  ```
	 **/
	@ $mol_mem
	Nav() {
		return (( obj )=>{
			obj.hierarchy = () => this.hierarchy()
			obj.record = ( id : any ) => this.option(id)
			obj.needle = () => this.filter()
			return obj
		})( new this.$.$mol_app_demo_nav(  ) )
	}

	/**
	 *  ```
	 *  hierarchy null
	 *  ```
	 **/
	hierarchy() {
		return null as any
	}

	/**
	 *  ```
	 *  option!id null
	 *  ```
	 **/
	option( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  Themes $mol_switch
	 *  	value?val <=> theme?val
	 *  	options *
	 *  		$mol_theme_light <= theme_light_title
	 *  		$mol_theme_dark <= theme_dark_title
	 *  ```
	 **/
	@ $mol_mem
	Themes() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.theme( val )
			obj.options = () => ({
			"$mol_theme_light" :  this.theme_light_title() ,
			"$mol_theme_dark" :  this.theme_dark_title() ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  theme?val \$mol_theme_dark
	 *  ```
	 **/
	@ $mol_mem
	theme( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "$mol_theme_dark"
	}

	/**
	 *  ```
	 *  theme_light_title @ \Light theme
	 *  ```
	 **/
	theme_light_title() {
		return this.$.$mol_locale.text( "$mol_app_demo_menu_theme_light_title" )
	}

	/**
	 *  ```
	 *  theme_dark_title @ \Dark theme
	 *  ```
	 **/
	theme_dark_title() {
		return this.$.$mol_locale.text( "$mol_app_demo_menu_theme_dark_title" )
	}

} }

namespace $ { export class $mol_app_demo_detail extends $mol_page {

	/**
	 *  ```
	 *  tools /
	 *  	<= Source_link
	 *  	<= Edit
	 *  	<= Close
	 *  ```
	 **/
	tools() {
		return [ this.Source_link() , this.Edit() , this.Close() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Source_link $mol_link_iconed
	 *  	title \
	 *  	uri <= source_link
	 *  	target \_blank
	 *  ```
	 **/
	@ $mol_mem
	Source_link() {
		return (( obj )=>{
			obj.title = () => ""
			obj.uri = () => this.source_link()
			obj.target = () => "_blank"
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  source_link \
	 *  ```
	 **/
	source_link() {
		return ""
	}

	/**
	 *  ```
	 *  Edit $mol_link
	 *  	sub /
	 *  		<= Edit_speck
	 *  		<= Edit_icon
	 *  	arg *
	 *  		edit \
	 *  		path \
	 *  ```
	 **/
	@ $mol_mem
	Edit() {
		return (( obj )=>{
			obj.sub = () => [ this.Edit_speck() , this.Edit_icon() ] as readonly any[]
			obj.arg = () => ({
			"edit" :  "" ,
			"path" :  "" ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Edit_speck $mol_speck value \β
	 *  ```
	 **/
	@ $mol_mem
	Edit_speck() {
		return (( obj )=>{
			obj.value = () => "β"
			return obj
		})( new this.$.$mol_speck(  ) )
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
	 *  Close $mol_link
	 *  	sub / <= Close_icon
	 *  	arg <= close_arg
	 *  ```
	 **/
	@ $mol_mem
	Close() {
		return (( obj )=>{
			obj.sub = () => [ this.Close_icon() ] as readonly any[]
			obj.arg = () => this.close_arg()
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Close_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Close_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  close_arg * demo null
	 *  ```
	 **/
	close_arg() {
		return ({
			"demo" :  null as any ,
		})
	}

} }

namespace $ { export class $mol_app_demo_nav extends $mol_grid {

	/**
	 *  ```
	 *  row_height 40
	 *  ```
	 **/
	row_height() {
		return 40
	}

	/**
	 *  ```
	 *  hierarchy_col \title
	 *  ```
	 **/
	hierarchy_col() {
		return "title"
	}

	/**
	 *  ```
	 *  Head null
	 *  ```
	 **/
	Head() {
		return null as any
	}

	/**
	 *  ```
	 *  Option!id $mol_link
	 *  	arg <= arg!id
	 *  	sub /
	 *  		<= Expand!id
	 *  		<= Content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Option( id : any ) {
		return (( obj )=>{
			obj.arg = () => this.arg(id)
			obj.sub = () => [ this.Expand(id) , this.Content(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  arg!id *
	 *  ```
	 **/
	arg( id : any ) {
		return ({
		})
	}

	/**
	 *  ```
	 *  Expand!id $mol_check_expand
	 *  	expanded?val <=> cell_expanded!id?val
	 *  	level <= cell_level!id
	 *  ```
	 **/
	@ $mol_mem_key
	Expand( id : any ) {
		return (( obj )=>{
			obj.expanded = ( val? : any ) => this.cell_expanded(id , val )
			obj.level = () => this.cell_level(id)
			return obj
		})( new this.$.$mol_check_expand(  ) )
	}

	/**
	 *  ```
	 *  Content!id $mol_view sub / <= cell_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Content( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.cell_content(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }

