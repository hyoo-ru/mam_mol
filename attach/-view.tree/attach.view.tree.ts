namespace $ { export class $mol_attach extends $mol_card {

	/**
	 *  ```
	 *  Content $mol_tiler items <= content
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.items = () => this.content()
			return obj
		})( new this.$.$mol_tiler(  ) )
	}

	/**
	 *  ```
	 *  content /$mol_view
	 *  ```
	 **/
	content() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  items?val /$mol_view
	 *  ```
	 **/
	@ $mol_mem
	items( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Add $mol_attach_add file_new?val <=> attach_new?val
	 *  ```
	 **/
	@ $mol_mem
	Add() {
		return (( obj )=>{
			obj.file_new = ( val? : any ) => this.attach_new( val )
			return obj
		})( new this.$.$mol_attach_add(  ) )
	}

	/**
	 *  ```
	 *  attach_new?val \
	 *  ```
	 **/
	@ $mol_mem
	attach_new( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Item!id $mol_attach_item title <= attach_title
	 *  ```
	 **/
	@ $mol_mem_key
	Item( id : any ) {
		return (( obj )=>{
			obj.title = () => this.attach_title()
			return obj
		})( new this.$.$mol_attach_item(  ) )
	}

	/**
	 *  ```
	 *  attach_title \
	 *  ```
	 **/
	attach_title() {
		return ""
	}

} }
namespace $ { export class $mol_attach_item extends $mol_link {

	/**
	 *  ```
	 *  url_thumb?val \
	 *  ```
	 **/
	@ $mol_mem
	url_thumb( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  uri?val <=> url_load?val
	 *  ```
	 **/
	@ $mol_mem
	uri( val? : any , force? : $mol_mem_force ) {
		return this.url_load( val )
	}

	/**
	 *  ```
	 *  url_load?val \
	 *  ```
	 **/
	@ $mol_mem
	url_load( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	backgroundImage <= style_bg
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"backgroundImage" :  this.style_bg() ,
		})
	}

	/**
	 *  ```
	 *  style_bg \
	 *  ```
	 **/
	style_bg() {
		return ""
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	download <= title
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"download" :  this.title() ,
		})
	}

	/**
	 *  ```
	 *  title \
	 *  ```
	 **/
	title() {
		return ""
	}

} }
namespace $ { export class $mol_attach_add extends $mol_button_minor {

	/**
	 *  ```
	 *  minimal_height 60
	 *  ```
	 **/
	minimal_height() {
		return 60
	}

	/**
	 *  ```
	 *  file_new?val \
	 *  ```
	 **/
	@ $mol_mem
	file_new( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Icon
	 *  	<= Input
	 *  ```
	 **/
	sub() {
		return [this.Icon() , this.Input()] as readonly any[]
	}

	/**
	 *  ```
	 *  Icon $mol_icon_attach
	 *  ```
	 **/
	@ $mol_mem
	Icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_attach(  ) )
	}

	/**
	 *  ```
	 *  Input $mol_attach_add_input
	 *  	event_capture?val <=> event_capture?val
	 *  	event_picked?val <=> event_picked?val
	 *  ```
	 **/
	@ $mol_mem
	Input() {
		return (( obj )=>{
			obj.event_capture = ( val? : any ) => this.event_capture( val )
			obj.event_picked = ( val? : any ) => this.event_picked( val )
			return obj
		})( new this.$.$mol_attach_add_input(  ) )
	}

	/**
	 *  ```
	 *  event_capture?val null
	 *  ```
	 **/
	@ $mol_mem
	event_capture( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  event_picked?val null
	 *  ```
	 **/
	@ $mol_mem
	event_picked( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

} }
namespace $ { export class $mol_attach_add_input extends $mol_view {

	/**
	 *  ```
	 *  dom_name \input
	 *  ```
	 **/
	dom_name() {
		return "input"
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	type <= type
	 *  	accept <= accept
	 *  	multiple <= multiple
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"type" :  this.type() ,
			"accept" :  this.accept() ,
			"multiple" :  this.multiple() ,
		})
	}

	/**
	 *  ```
	 *  type \file
	 *  ```
	 **/
	type() {
		return "file"
	}

	/**
	 *  ```
	 *  accept \image/*;capture=camera
	 *  ```
	 **/
	accept() {
		return "image/*;capture=camera"
	}

	/**
	 *  ```
	 *  multiple true
	 *  ```
	 **/
	multiple() {
		return true
	}

	/**
	 *  ```
	 *  event_click?val <=> event_capture?val
	 *  ```
	 **/
	@ $mol_mem
	event_click( val? : any , force? : $mol_mem_force ) {
		return this.event_capture( val )
	}

	/**
	 *  ```
	 *  event_capture?val null
	 *  ```
	 **/
	@ $mol_mem
	event_capture( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	change?val <=> event_picked?val
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"change" :  ( val? : any )=>  this.event_picked( val ) ,
		})
	}

	/**
	 *  ```
	 *  event_picked?val null
	 *  ```
	 **/
	@ $mol_mem
	event_picked( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

} }
