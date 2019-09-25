namespace $ { export class $mol_app_users extends $mol_page {

	/**
	 *  ```
	 *  head / <= Head_row
	 *  ```
	 **/
	head() {
		return [].concat( this.Head_row() )
	}

	/**
	 *  ```
	 *  Head_row $mol_row sub / <= Filter
	 *  ```
	 **/
	@ $mol_mem
	Head_row() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Filter() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Filter $mol_string
	 *  	hint <= filter_hint
	 *  	value?val <=> query?val
	 *  ```
	 **/
	@ $mol_mem
	Filter() {
		return (( obj )=>{
			obj.hint = () => this.filter_hint()
			obj.value = ( val? : any ) => this.query( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  filter_hint @ \Search users on GitHub
	 *  ```
	 **/
	filter_hint() {
		return this.$.$mol_locale.text( "$mol_app_users_filter_hint" )
	}

	/**
	 *  ```
	 *  query?val \
	 *  ```
	 **/
	@ $mol_mem
	query( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  body / <= List
	 *  ```
	 **/
	body() {
		return [].concat( this.List() )
	}

	/**
	 *  ```
	 *  List $mol_list
	 *  	rows <= user_rows
	 *  	Empty <= Empty
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => this.user_rows()
			obj.Empty = () => this.Empty()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  user_rows /
	 *  ```
	 **/
	user_rows() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Empty $mol_view sub / <= empty_message
	 *  ```
	 **/
	@ $mol_mem
	Empty() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.empty_message() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  empty_message @ \Users not found
	 *  ```
	 **/
	empty_message() {
		return this.$.$mol_locale.text( "$mol_app_users_empty_message" )
	}

	/**
	 *  ```
	 *  Foot $mol_row sub /
	 *  	<= Reload
	 *  	<= Add
	 *  	<= Save
	 *  	<= Message
	 *  ```
	 **/
	@ $mol_mem
	Foot() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Reload() , this.Add() , this.Save() , this.Message() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Reload $mol_button_minor
	 *  	sub / <= reload_label
	 *  	event_click?val <=> event_reload?val
	 *  ```
	 **/
	@ $mol_mem
	Reload() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.reload_label() )
			obj.event_click = ( val? : any ) => this.event_reload( val )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  reload_label @ \Reload
	 *  ```
	 **/
	reload_label() {
		return this.$.$mol_locale.text( "$mol_app_users_reload_label" )
	}

	/**
	 *  ```
	 *  event_reload?val null
	 *  ```
	 **/
	@ $mol_mem
	event_reload( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Add $mol_button_minor
	 *  	enabled <= loaded
	 *  	sub / <= add_label
	 *  	event_click?val <=> event_add?val
	 *  ```
	 **/
	@ $mol_mem
	Add() {
		return (( obj )=>{
			obj.enabled = () => this.loaded()
			obj.sub = () => [].concat( this.add_label() )
			obj.event_click = ( val? : any ) => this.event_add( val )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  loaded false
	 *  ```
	 **/
	loaded() {
		return false
	}

	/**
	 *  ```
	 *  add_label @ \Add
	 *  ```
	 **/
	add_label() {
		return this.$.$mol_locale.text( "$mol_app_users_add_label" )
	}

	/**
	 *  ```
	 *  event_add?val null
	 *  ```
	 **/
	@ $mol_mem
	event_add( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Save $mol_button_major
	 *  	enabled <= changed
	 *  	sub / <= save_label
	 *  	event_click?val <=> event_save?val
	 *  ```
	 **/
	@ $mol_mem
	Save() {
		return (( obj )=>{
			obj.enabled = () => this.changed()
			obj.sub = () => [].concat( this.save_label() )
			obj.event_click = ( val? : any ) => this.event_save( val )
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  changed false
	 *  ```
	 **/
	changed() {
		return false
	}

	/**
	 *  ```
	 *  save_label @ \Save
	 *  ```
	 **/
	save_label() {
		return this.$.$mol_locale.text( "$mol_app_users_save_label" )
	}

	/**
	 *  ```
	 *  event_save?val null
	 *  ```
	 **/
	@ $mol_mem
	event_save( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Message $mol_status status <= users_master
	 *  ```
	 **/
	@ $mol_mem
	Message() {
		return (( obj )=>{
			obj.status = () => this.users_master()
			return obj
		})( new this.$.$mol_status(  ) )
	}

	/**
	 *  ```
	 *  users_master null
	 *  ```
	 **/
	users_master() {
		return null as any
	}

	/**
	 *  ```
	 *  plugins / <= Touch
	 *  ```
	 **/
	plugins() {
		return [].concat( this.Touch() )
	}

	/**
	 *  ```
	 *  Touch $mol_touch swipe_bottom?val <=> event_reload?val
	 *  ```
	 **/
	@ $mol_mem
	Touch() {
		return (( obj )=>{
			obj.swipe_bottom = ( val? : any ) => this.event_reload( val )
			return obj
		})( new this.$.$mol_touch(  ) )
	}

	/**
	 *  ```
	 *  User_row!id $mol_app_users_row
	 *  	title?val <=> user_name!id?val
	 *  	event_drop?val <=> event_user_drop!id?val
	 *  ```
	 **/
	@ $mol_mem_key
	User_row( id : any ) {
		return (( obj )=>{
			obj.title = ( val? : any ) => this.user_name(id , val )
			obj.event_drop = ( val? : any ) => this.event_user_drop(id , val )
			return obj
		})( new this.$.$mol_app_users_row(  ) )
	}

	/**
	 *  ```
	 *  user_name!id?val \
	 *  ```
	 **/
	@ $mol_mem_key
	user_name( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  event_user_drop!id?val null
	 *  ```
	 **/
	@ $mol_mem_key
	event_user_drop( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

} }

namespace $ { export class $mol_app_users_row extends $mol_row {

	/**
	 *  ```
	 *  minimal_height 68
	 *  ```
	 **/
	minimal_height() {
		return 68
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Title
	 *  	<= Drop
	 *  ```
	 **/
	sub() {
		return [].concat( this.Title() , this.Drop() )
	}

	/**
	 *  ```
	 *  Title $mol_string value?val <=> title?val
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.title( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  title?val \
	 *  ```
	 **/
	@ $mol_mem
	title( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Drop $mol_button_minor
	 *  	sub / <= drop_label
	 *  	event_click?val <=> event_drop?val
	 *  ```
	 **/
	@ $mol_mem
	Drop() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.drop_label() )
			obj.event_click = ( val? : any ) => this.event_drop( val )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  drop_label \Drop
	 *  ```
	 **/
	drop_label() {
		return "Drop"
	}

	/**
	 *  ```
	 *  event_drop?val null
	 *  ```
	 **/
	@ $mol_mem
	event_drop( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

} }

