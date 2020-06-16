namespace $ { export class $mol_select extends $mol_pop {

	/**
	 *  ```
	 *  dictionary *
	 *  ```
	 **/
	dictionary() {
		return ({
		})
	}

	/**
	 *  ```
	 *  options /string
	 *  ```
	 **/
	options() {
		return [] as readonly ( string )[]
	}

	/**
	 *  ```
	 *  value?val \
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  minimal_height 40
	 *  ```
	 **/
	minimal_height() {
		return 40
	}

	/**
	 *  ```
	 *  Option_row!id $mol_button_minor
	 *  	event_click?event <=> event_select!id?event
	 *  	sub <= option_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Option_row( id : any ) {
		return (( obj )=>{
			obj.event_click = ( event? : any ) => this.event_select(id , event )
			obj.sub = () => this.option_content(id)
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  event_select!id?event null
	 *  ```
	 **/
	@ $mol_mem_key
	event_select( id : any , event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  option_content!id / <= Option_label!id
	 *  ```
	 **/
	option_content( id : any ) {
		return [this.Option_label(id)] as readonly any[]
	}

	/**
	 *  ```
	 *  Option_label!id $mol_dimmer
	 *  	minimal_height 40
	 *  	haystack <= option_label!id
	 *  	needle <= filter_pattern?val
	 *  ```
	 **/
	@ $mol_mem_key
	Option_label( id : any ) {
		return (( obj )=>{
			obj.minimal_height = () => 40
			obj.haystack = () => this.option_label(id)
			obj.needle = () => this.filter_pattern()
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  option_label!id \
	 *  ```
	 **/
	option_label( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  filter_pattern?val \
	 *  ```
	 **/
	@ $mol_mem
	filter_pattern( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  No_options $mol_view sub / <= no_options_message
	 *  ```
	 **/
	@ $mol_mem
	No_options() {
		return (( obj )=>{
			obj.sub = () => [this.no_options_message()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  no_options_message @ \No options
	 *  ```
	 **/
	no_options_message() {
		return this.$.$mol_locale.text( "$mol_select_no_options_message" )
	}

	/**
	 *  ```
	 *  plugins /
	 *  	^
	 *  	<= Nav
	 *  ```
	 **/
	plugins() {
		return [...super.plugins() , this.Nav()] as readonly any[]
	}

	/**
	 *  ```
	 *  Nav $mol_nav
	 *  	keys_y <= nav_components
	 *  	current_y?component <=> option_focused?component
	 *  	cycle?val <=> nav_cycle?val
	 *  ```
	 **/
	@ $mol_mem
	Nav() {
		return (( obj )=>{
			obj.keys_y = () => this.nav_components()
			obj.current_y = ( component? : any ) => this.option_focused( component )
			obj.cycle = ( val? : any ) => this.nav_cycle( val )
			return obj
		})( new this.$.$mol_nav(  ) )
	}

	/**
	 *  ```
	 *  nav_components /$mol_view
	 *  ```
	 **/
	nav_components() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  option_focused?component null
	 *  ```
	 **/
	@ $mol_mem
	option_focused( component? : any , force? : $mol_mem_force ) {
		return ( component !== void 0 ) ? component : null as any
	}

	/**
	 *  ```
	 *  nav_cycle?val true
	 *  ```
	 **/
	@ $mol_mem
	nav_cycle( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/**
	 *  ```
	 *  showed?val <=> options_showed?val
	 *  ```
	 **/
	@ $mol_mem
	showed( val? : any , force? : $mol_mem_force ) {
		return this.options_showed( val )
	}

	/**
	 *  ```
	 *  options_showed?val false
	 *  ```
	 **/
	@ $mol_mem
	options_showed( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Anchor <= Trigger
	 *  ```
	 **/
	Anchor() {
		return this.Trigger()
	}

	/**
	 *  ```
	 *  Trigger $mol_button_minor
	 *  	click?event <=> open?event
	 *  	sub <= trigger_content
	 *  ```
	 **/
	@ $mol_mem
	Trigger() {
		return (( obj )=>{
			obj.click = ( event? : any ) => this.open( event )
			obj.sub = () => this.trigger_content()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  open?event null
	 *  ```
	 **/
	@ $mol_mem
	open( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  trigger_content /$mol_view_content
	 *  ```
	 **/
	trigger_content() {
		return [] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  bubble_content / <= Menu
	 *  ```
	 **/
	bubble_content() {
		return [this.Menu()] as readonly any[]
	}

	/**
	 *  ```
	 *  Menu $mol_list rows <= menu_content
	 *  ```
	 **/
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.rows = () => this.menu_content()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  menu_content /$mol_view
	 *  ```
	 **/
	menu_content() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  option_content_current /$mol_view_content
	 *  ```
	 **/
	option_content_current() {
		return [] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Filter $mol_string
	 *  	value?val <=> filter_pattern?val
	 *  	hint <= filter_hint
	 *  	submit?event <=> submit?event
	 *  ```
	 **/
	@ $mol_mem
	Filter() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.filter_pattern( val )
			obj.hint = () => this.filter_hint()
			obj.submit = ( event? : any ) => this.submit( event )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  filter_hint <= hint
	 *  ```
	 **/
	filter_hint() {
		return this.hint()
	}

	/**
	 *  ```
	 *  hint @ \Search..
	 *  ```
	 **/
	hint() {
		return this.$.$mol_locale.text( "$mol_select_hint" )
	}

	/**
	 *  ```
	 *  submit?event null
	 *  ```
	 **/
	@ $mol_mem
	submit( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Trigger_icon $mol_icon_chevron
	 *  ```
	 **/
	@ $mol_mem
	Trigger_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_chevron(  ) )
	}

} }
