namespace $ { export class $mol_app_studio_field extends $mol_expander {

	/**
	 *  ```
	 *  path /
	 *  ```
	 **/
	path() {
		return [].concat(  )
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
	expanded( val? : any , force? : $mol_atom_force ) {
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
	 *  tools /
	 *  	<= Type
	 *  	<= Object
	 *  ```
	 **/
	tools() {
		return [].concat( this.Type() , this.Object() )
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
	type( val? : any , force? : $mol_atom_force ) {
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
	class( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  object_options /
	 *  ```
	 **/
	object_options() {
		return [].concat(  )
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
		return [].concat( this.Bool() , this.Number() , this.String() , this.Bind() , this.List() , this.Dict() , this.Overs() )
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
	value_bool( val? : any , force? : $mol_atom_force ) {
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
	value_number( val? : any , force? : $mol_atom_force ) {
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
	value_string( val? : any , force? : $mol_atom_force ) {
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
	bind( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  bind_options /
	 *  ```
	 **/
	bind_options() {
		return [].concat(  )
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
	event_prop_add( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  List $mol_list rows /
	 *  	<= list_rows
	 *  	<= Add
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => [].concat( this.list_rows() , this.Add() )
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  list_rows /
	 *  ```
	 **/
	list_rows() {
		return [].concat(  )
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
	add_item( val? : any , force? : $mol_atom_force ) {
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
	 *  Dict $mol_list rows /
	 *  	<= pairs
	 *  	<= Add_pair
	 *  ```
	 **/
	@ $mol_mem
	Dict() {
		return (( obj )=>{
			obj.rows = () => [].concat( this.pairs() , this.Add_pair() )
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  pairs /
	 *  ```
	 **/
	pairs() {
		return [].concat(  )
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
			obj.sub = () => [].concat( this.Add_pair_key() , this.Add_pair_submit() )
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
	add_pair_key( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  key_suggests /
	 *  ```
	 **/
	key_suggests() {
		return [].concat(  )
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
			obj.sub = () => [].concat( this.Add_pair_submit_icon() )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  add_pair?val \
	 *  ```
	 **/
	@ $mol_mem
	add_pair( val? : any , force? : $mol_atom_force ) {
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
	 *  Overs $mol_list rows /
	 *  	<= overs
	 *  	<= Add_over
	 *  ```
	 **/
	@ $mol_mem
	Overs() {
		return (( obj )=>{
			obj.rows = () => [].concat( this.overs() , this.Add_over() )
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  overs /
	 *  ```
	 **/
	overs() {
		return [].concat(  )
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
	add_over( val? : any , force? : $mol_atom_force ) {
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
		return [].concat(  )
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
		return [].concat(  )
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
	prop( path : any , val? : any , force? : $mol_atom_force ) {
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
	props( name : any , val? : any , force? : $mol_atom_force ) {
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
	prop_add( val? : any , force? : $mol_atom_force ) {
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

