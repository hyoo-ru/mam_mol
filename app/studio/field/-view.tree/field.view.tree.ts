namespace $ { export class $mol_app_studio_field extends $mol_expander {

	/**
	 *  ```
	 *  path /
	 *  ```
	 **/
	path() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Trigger $mol_app_studio_field_title
	 *  	checked?val <=> expanded?val
	 *  	Title <= Trigger_label
	 *  	type <= type
	 *  ```
	 **/
	@ $mol_mem
	Trigger() {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.expanded( val )
			obj.Title = () => this.Trigger_label()
			obj.type = () => this.type()
			return obj
		})( new this.$.$mol_app_studio_field_title(  ) )
	}

	/**
	 *  ```
	 *  expanded?val false
	 *  ```
	 **/
	@ $mol_mem
	expanded( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Trigger_label $mol_dimmer
	 *  	needle <= highlight
	 *  	haystack <= title
	 *  ```
	 **/
	@ $mol_mem
	Trigger_label() {
		return (( obj )=>{
			obj.needle = () => this.highlight()
			obj.haystack = () => this.title()
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  highlight \
	 *  ```
	 **/
	highlight() {
		return ""
	}

	/**
	 *  ```
	 *  Tools $mol_view sub <= tools
	 *  ```
	 **/
	@ $mol_mem
	Tools() {
		return (( obj )=>{
			obj.sub = () => this.tools()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  tools /
	 *  	<= Type
	 *  	<= Object
	 *  ```
	 **/
	tools() {
		return [ this.Type() , this.Object() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Type $mol_select
	 *  	value?val <=> type?val
	 *  	hint <= type_hint
	 *  	Trigger_icon null
	 *  	dictionary <= types
	 *  ```
	 **/
	@ $mol_mem
	Type() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.type( val )
			obj.hint = () => this.type_hint()
			obj.Trigger_icon = () => null as any
			obj.dictionary = () => this.types()
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  type?val \null
	 *  ```
	 **/
	@ $mol_mem
	type( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "null"
	}

	/**
	 *  ```
	 *  type_hint @ \Type...
	 *  ```
	 **/
	type_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_field_type_hint" )
	}

	/**
	 *  ```
	 *  types *
	 *  	get \<=
	 *  	bind \<=>
	 *  	object \Object
	 *  	string \Text
	 *  	locale \Localization
	 *  	number \Number
	 *  	bool \Flag
	 *  	list \List
	 *  	dict \Dictionary
	 *  	null \None
	 *  ```
	 **/
	types() {
		return ({
			"get" :  "<=" ,
			"bind" :  "<=>" ,
			"object" :  "Object" ,
			"string" :  "Text" ,
			"locale" :  "Localization" ,
			"number" :  "Number" ,
			"bool" :  "Flag" ,
			"list" :  "List" ,
			"dict" :  "Dictionary" ,
			"null" :  "None" ,
		})
	}

	/**
	 *  ```
	 *  Object $mol_select
	 *  	value?val <=> class?val
	 *  	options <= object_options
	 *  	hint <= object_hint
	 *  	Trigger_icon null
	 *  ```
	 **/
	@ $mol_mem
	Object() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.class( val )
			obj.options = () => this.object_options()
			obj.hint = () => this.object_hint()
			obj.Trigger_icon = () => null as any
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  class?val null
	 *  ```
	 **/
	@ $mol_mem
	class( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  object_options /
	 *  ```
	 **/
	object_options() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  object_hint @ \Class...
	 *  ```
	 **/
	object_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_field_object_hint" )
	}

	/**
	 *  ```
	 *  content /
	 *  	<= Bool
	 *  	<= Number
	 *  	<= String
	 *  	<= Bind
	 *  	<= List
	 *  	<= Dict
	 *  	<= Overs
	 *  ```
	 **/
	content() {
		return [ this.Bool() , this.Number() , this.String() , this.Bind() , this.List() , this.Dict() , this.Overs() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Bool $mol_switch
	 *  	value?val <=> value_bool?val
	 *  	options *
	 *  		true \True
	 *  		false \False
	 *  ```
	 **/
	@ $mol_mem
	Bool() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.value_bool( val )
			obj.options = () => ({
			"true" :  "True" ,
			"false" :  "False" ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  value_bool?val null
	 *  ```
	 **/
	@ $mol_mem
	value_bool( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Number $mol_number
	 *  	value?val <=> value_number?val
	 *  	hint <= hint
	 *  ```
	 **/
	@ $mol_mem
	Number() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.value_number( val )
			obj.hint = () => this.hint()
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  value_number?val NaN
	 *  ```
	 **/
	@ $mol_mem
	value_number( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : NaN
	}

	/**
	 *  ```
	 *  hint \
	 *  ```
	 **/
	hint() {
		return ""
	}

	/**
	 *  ```
	 *  String $mol_textarea
	 *  	value?val <=> value_string?val
	 *  	hint <= hint
	 *  ```
	 **/
	@ $mol_mem
	String() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.value_string( val )
			obj.hint = () => this.hint()
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  value_string?val null
	 *  ```
	 **/
	@ $mol_mem
	value_string( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Bind $mol_select
	 *  	value?val <=> bind?val
	 *  	options <= bind_options
	 *  	hint <= bind_hint
	 *  	No_options <= Prop_add
	 *  	Trigger_icon null
	 *  ```
	 **/
	@ $mol_mem
	Bind() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.bind( val )
			obj.options = () => this.bind_options()
			obj.hint = () => this.bind_hint()
			obj.No_options = () => this.Prop_add()
			obj.Trigger_icon = () => null as any
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  bind?val null
	 *  ```
	 **/
	@ $mol_mem
	bind( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  bind_options /
	 *  ```
	 **/
	bind_options() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  bind_hint @ \Property..
	 *  ```
	 **/
	bind_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_field_bind_hint" )
	}

	/**
	 *  ```
	 *  Prop_add $mol_button_minor
	 *  	title <= prop_add_label
	 *  	event_click?val <=> event_prop_add?val
	 *  ```
	 **/
	@ $mol_mem
	Prop_add() {
		return (( obj )=>{
			obj.title = () => this.prop_add_label()
			obj.event_click = ( val? : any ) => this.event_prop_add( val )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  prop_add_label @ \Add property
	 *  ```
	 **/
	prop_add_label() {
		return this.$.$mol_locale.text( "$mol_app_studio_field_prop_add_label" )
	}

	/**
	 *  ```
	 *  event_prop_add?val null
	 *  ```
	 **/
	@ $mol_mem
	event_prop_add( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  List $mol_list rows <= list_rows
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => this.list_rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  list_rows /
	 *  ```
	 **/
	list_rows() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Dict $mol_list rows <= pairs
	 *  ```
	 **/
	@ $mol_mem
	Dict() {
		return (( obj )=>{
			obj.rows = () => this.pairs()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  pairs /
	 *  ```
	 **/
	pairs() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Overs $mol_list rows <= overs
	 *  ```
	 **/
	@ $mol_mem
	Overs() {
		return (( obj )=>{
			obj.rows = () => this.overs()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  overs /
	 *  ```
	 **/
	overs() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Add $mol_select
	 *  	hint <= add_hint
	 *  	value?val <=> add_item?val
	 *  	dictionary <= item_types
	 *  	Trigger_icon <= List_trigger_icon
	 *  ```
	 **/
	@ $mol_mem
	Add() {
		return (( obj )=>{
			obj.hint = () => this.add_hint()
			obj.value = ( val? : any ) => this.add_item( val )
			obj.dictionary = () => this.item_types()
			obj.Trigger_icon = () => this.List_trigger_icon()
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  add_hint @ \Add item..
	 *  ```
	 **/
	add_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_field_add_hint" )
	}

	/**
	 *  ```
	 *  add_item?val \
	 *  ```
	 **/
	@ $mol_mem
	add_item( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  item_types *
	 *  	get \<=
	 *  	string \Text
	 *  	number \Number
	 *  	bool \Flag
	 *  	list \List
	 *  	dict \Dictionary
	 *  	null \None
	 *  ```
	 **/
	item_types() {
		return ({
			"get" :  "<=" ,
			"string" :  "Text" ,
			"number" :  "Number" ,
			"bool" :  "Flag" ,
			"list" :  "List" ,
			"dict" :  "Dictionary" ,
			"null" :  "None" ,
		})
	}

	/**
	 *  ```
	 *  List_trigger_icon $mol_icon_plus
	 *  ```
	 **/
	@ $mol_mem
	List_trigger_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_plus(  ) )
	}

	/**
	 *  ```
	 *  Add_pair $mol_bar sub /
	 *  	<= Add_pair_key
	 *  	<= Add_pair_submit
	 *  ```
	 **/
	@ $mol_mem
	Add_pair() {
		return (( obj )=>{
			obj.sub = () => [ this.Add_pair_key() , this.Add_pair_submit() ] as readonly any[]
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  Add_pair_key $mol_search
	 *  	hint <= add_pair_hint
	 *  	query?val <=> add_pair_key?val
	 *  	suggests <= key_suggests
	 *  ```
	 **/
	@ $mol_mem
	Add_pair_key() {
		return (( obj )=>{
			obj.hint = () => this.add_pair_hint()
			obj.query = ( val? : any ) => this.add_pair_key( val )
			obj.suggests = () => this.key_suggests()
			return obj
		})( new this.$.$mol_search(  ) )
	}

	/**
	 *  ```
	 *  add_pair_hint @ \Add key..
	 *  ```
	 **/
	add_pair_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_field_add_pair_hint" )
	}

	/**
	 *  ```
	 *  add_pair_key?val \
	 *  ```
	 **/
	@ $mol_mem
	add_pair_key( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  key_suggests /
	 *  ```
	 **/
	key_suggests() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Add_pair_submit $mol_button_minor
	 *  	event_click?val <=> add_pair?val
	 *  	sub / <= Add_pair_submit_icon
	 *  ```
	 **/
	@ $mol_mem
	Add_pair_submit() {
		return (( obj )=>{
			obj.event_click = ( val? : any ) => this.add_pair( val )
			obj.sub = () => [ this.Add_pair_submit_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  add_pair?val \
	 *  ```
	 **/
	@ $mol_mem
	add_pair( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Add_pair_submit_icon $mol_icon_plus
	 *  ```
	 **/
	@ $mol_mem
	Add_pair_submit_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_plus(  ) )
	}

	/**
	 *  ```
	 *  Add_over $mol_select
	 *  	hint <= add_over_hint
	 *  	value?val <=> add_over?val
	 *  	Trigger_icon <= Overs_trigger_icon
	 *  	options <= over_options
	 *  ```
	 **/
	@ $mol_mem
	Add_over() {
		return (( obj )=>{
			obj.hint = () => this.add_over_hint()
			obj.value = ( val? : any ) => this.add_over( val )
			obj.Trigger_icon = () => this.Overs_trigger_icon()
			obj.options = () => this.over_options()
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  add_over_hint @ \Add override..
	 *  ```
	 **/
	add_over_hint() {
		return this.$.$mol_locale.text( "$mol_app_studio_field_add_over_hint" )
	}

	/**
	 *  ```
	 *  add_over?val \
	 *  ```
	 **/
	@ $mol_mem
	add_over( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Overs_trigger_icon $mol_icon_plus
	 *  ```
	 **/
	@ $mol_mem
	Overs_trigger_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_plus(  ) )
	}

	/**
	 *  ```
	 *  over_options /
	 *  ```
	 **/
	over_options() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Prop!id $mol_app_studio_field
	 *  	path <= prop_path!id
	 *  	prop_arg!id <= prop_arg!id
	 *  	prop!path?val <=> prop!path?val
	 *  	props!name?val <=> props!name?val
	 *  	prop_value!id <= prop_value!id
	 *  	bind_options <= bind_options
	 *  	prop_add?val <=> prop_add?val
	 *  	object_options <= object_options
	 *  ```
	 **/
	@ $mol_mem_key
	Prop( id : any ) {
		return (( obj )=>{
			obj.path = () => this.prop_path(id)
			obj.prop_arg = ( id : any ) => this.prop_arg(id)
			obj.prop = ( path : any , val? : any ) => this.prop(path , val )
			obj.props = ( name : any , val? : any ) => this.props(name , val )
			obj.prop_value = ( id : any ) => this.prop_value(id)
			obj.bind_options = () => this.bind_options()
			obj.prop_add = ( val? : any ) => this.prop_add( val )
			obj.object_options = () => this.object_options()
			return obj
		})( new this.$.$mol_app_studio_field(  ) )
	}

	/**
	 *  ```
	 *  prop_path!id /
	 *  ```
	 **/
	prop_path( id : any ) {
		return [  ] as readonly any[]
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
	 *  prop!path?val $mol_tree
	 *  ```
	 **/
	@ $mol_mem_key
	prop( path : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_tree(  ) )
	}

	/**
	 *  ```
	 *  props!name?val $mol_tree
	 *  ```
	 **/
	@ $mol_mem_key
	props( name : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_tree(  ) )
	}

	/**
	 *  ```
	 *  prop_value!id null
	 *  ```
	 **/
	prop_value( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  prop_add?val null
	 *  ```
	 **/
	@ $mol_mem
	prop_add( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

} }

namespace $ { export class $mol_app_studio_field_title extends $mol_check_expand {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_app_studio_field_title_type <= type
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_app_studio_field_title_type" :  this.type() ,
		})
	}

	/**
	 *  ```
	 *  type \null
	 *  ```
	 **/
	type() {
		return "null"
	}

} }

