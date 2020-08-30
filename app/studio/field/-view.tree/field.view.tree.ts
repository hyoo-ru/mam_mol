namespace $ {
	export class $mol_app_studio_field extends $mol_expander {

		/**
		 * ```tree
		 * path /
		 * ```
		 */
		path() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Trigger $mol_app_studio_field_title
		 * 	checked?val <=> expanded?val false
		 * 	Title <= Trigger_label $mol_dimmer
		 * 		needle <= highlight \
		 * 		haystack <= title
		 * 	type <= type
		 * ```
		 */
		@ $mol_mem
		Trigger() {
			const obj = new this.$.$mol_app_studio_field_title()

			obj.checked = (val?: any) => this.expanded(val)
			obj.Title = () => this.Trigger_label()
			obj.type = () => this.type()

			return obj
		}

		/**
		 * ```tree
		 * expanded?val false
		 * ```
		 */
		@ $mol_mem
		expanded(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Trigger_label $mol_dimmer
		 * 	needle <= highlight \
		 * 	haystack <= title
		 * ```
		 */
		@ $mol_mem
		Trigger_label() {
			const obj = new this.$.$mol_dimmer()

			obj.needle = () => this.highlight()
			obj.haystack = () => this.title()

			return obj
		}

		/**
		 * ```tree
		 * highlight \
		 * ```
		 */
		highlight() {
			return ""
		}

		/**
		 * ```tree
		 * Tools $mol_view sub <= tools /
		 * 	<= Type $mol_select
		 * 		value?val <=> type?val \null
		 * 		hint <= type_hint @ \Type...
		 * 		Trigger_icon null
		 * 		dictionary <= types *
		 * 			get \<=
		 * 			bind \<=>
		 * 			object \Object
		 * 			string \Text
		 * 			locale \Localization
		 * 			number \Number
		 * 			bool \Flag
		 * 			list \List
		 * 			dict \Dictionary
		 * 			null \None
		 * 	<= Object $mol_select
		 * 		value?val <=> class?val null
		 * 		options <= object_options /
		 * 		hint <= object_hint @ \Class...
		 * 		Trigger_icon null
		 * ```
		 */
		@ $mol_mem
		Tools() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.tools()

			return obj
		}

		/**
		 * ```tree
		 * tools /
		 * 	<= Type $mol_select
		 * 		value?val <=> type?val \null
		 * 		hint <= type_hint @ \Type...
		 * 		Trigger_icon null
		 * 		dictionary <= types *
		 * 			get \<=
		 * 			bind \<=>
		 * 			object \Object
		 * 			string \Text
		 * 			locale \Localization
		 * 			number \Number
		 * 			bool \Flag
		 * 			list \List
		 * 			dict \Dictionary
		 * 			null \None
		 * 	<= Object $mol_select
		 * 		value?val <=> class?val null
		 * 		options <= object_options /
		 * 		hint <= object_hint @ \Class...
		 * 		Trigger_icon null
		 * ```
		 */
		tools() {
			return [
				this.Type(),
				this.Object()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Type $mol_select
		 * 	value?val <=> type?val \null
		 * 	hint <= type_hint @ \Type...
		 * 	Trigger_icon null
		 * 	dictionary <= types *
		 * 		get \<=
		 * 		bind \<=>
		 * 		object \Object
		 * 		string \Text
		 * 		locale \Localization
		 * 		number \Number
		 * 		bool \Flag
		 * 		list \List
		 * 		dict \Dictionary
		 * 		null \None
		 * ```
		 */
		@ $mol_mem
		Type() {
			const obj = new this.$.$mol_select()

			obj.value = (val?: any) => this.type(val)
			obj.hint = () => this.type_hint()
			obj.Trigger_icon = () => null as any
			obj.dictionary = () => this.types()

			return obj
		}

		/**
		 * ```tree
		 * type?val \null
		 * ```
		 */
		@ $mol_mem
		type(val?: any) {
			if ( val !== undefined ) return val
			return "null"
		}

		/**
		 * ```tree
		 * type_hint @ \Type...
		 * ```
		 */
		type_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_field_type_hint' )
		}

		/**
		 * ```tree
		 * types *
		 * 	get \<=
		 * 	bind \<=>
		 * 	object \Object
		 * 	string \Text
		 * 	locale \Localization
		 * 	number \Number
		 * 	bool \Flag
		 * 	list \List
		 * 	dict \Dictionary
		 * 	null \None
		 * ```
		 */
		types() {
			return {
				get: "<=",
				bind: "<=>",
				object: "Object",
				string: "Text",
				locale: "Localization",
				number: "Number",
				bool: "Flag",
				list: "List",
				dict: "Dictionary",
				null: "None"
			}
		}

		/**
		 * ```tree
		 * Object $mol_select
		 * 	value?val <=> class?val null
		 * 	options <= object_options /
		 * 	hint <= object_hint @ \Class...
		 * 	Trigger_icon null
		 * ```
		 */
		@ $mol_mem
		Object() {
			const obj = new this.$.$mol_select()

			obj.value = (val?: any) => this.class(val)
			obj.options = () => this.object_options()
			obj.hint = () => this.object_hint()
			obj.Trigger_icon = () => null as any

			return obj
		}

		/**
		 * ```tree
		 * class?val null
		 * ```
		 */
		@ $mol_mem
		class(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * object_options /
		 * ```
		 */
		object_options() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * object_hint @ \Class...
		 * ```
		 */
		object_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_field_object_hint' )
		}

		/**
		 * ```tree
		 * content /
		 * 	<= Bool $mol_switch
		 * 		value?val <=> value_bool?val null
		 * 		options *
		 * 			true \True
		 * 			false \False
		 * 	<= Number $mol_number
		 * 		value?val <=> value_number?val NaN
		 * 		hint <= hint \
		 * 	<= String $mol_textarea
		 * 		value?val <=> value_string?val null
		 * 		hint <= hint \
		 * 	<= Bind $mol_select
		 * 		value?val <=> bind?val null
		 * 		options <= bind_options /
		 * 		hint <= bind_hint @ \Property..
		 * 		No_options <= Prop_add $mol_button_minor
		 * 			title <= prop_add_label @ \Add property
		 * 			event_click?val <=> event_prop_add?val null
		 * 		Trigger_icon null
		 * 	<= List $mol_list rows <= list_rows /
		 * 	<= Dict $mol_list rows <= pairs /
		 * 	<= Overs $mol_list rows <= overs /
		 * ```
		 */
		content() {
			return [
				this.Bool(),
				this.Number(),
				this.String(),
				this.Bind(),
				this.List(),
				this.Dict(),
				this.Overs()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Bool $mol_switch
		 * 	value?val <=> value_bool?val null
		 * 	options *
		 * 		true \True
		 * 		false \False
		 * ```
		 */
		@ $mol_mem
		Bool() {
			const obj = new this.$.$mol_switch()

			obj.value = (val?: any) => this.value_bool(val)
			obj.options = () => ({
				true: "True",
				false: "False"
			})

			return obj
		}

		/**
		 * ```tree
		 * value_bool?val null
		 * ```
		 */
		@ $mol_mem
		value_bool(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Number $mol_number
		 * 	value?val <=> value_number?val NaN
		 * 	hint <= hint \
		 * ```
		 */
		@ $mol_mem
		Number() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.value_number(val)
			obj.hint = () => this.hint()

			return obj
		}

		/**
		 * ```tree
		 * value_number?val NaN
		 * ```
		 */
		@ $mol_mem
		value_number(val?: any) {
			if ( val !== undefined ) return val
			return NaN
		}

		/**
		 * ```tree
		 * hint \
		 * ```
		 */
		hint() {
			return ""
		}

		/**
		 * ```tree
		 * String $mol_textarea
		 * 	value?val <=> value_string?val null
		 * 	hint <= hint \
		 * ```
		 */
		@ $mol_mem
		String() {
			const obj = new this.$.$mol_textarea()

			obj.value = (val?: any) => this.value_string(val)
			obj.hint = () => this.hint()

			return obj
		}

		/**
		 * ```tree
		 * value_string?val null
		 * ```
		 */
		@ $mol_mem
		value_string(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Bind $mol_select
		 * 	value?val <=> bind?val null
		 * 	options <= bind_options /
		 * 	hint <= bind_hint @ \Property..
		 * 	No_options <= Prop_add $mol_button_minor
		 * 		title <= prop_add_label @ \Add property
		 * 		event_click?val <=> event_prop_add?val null
		 * 	Trigger_icon null
		 * ```
		 */
		@ $mol_mem
		Bind() {
			const obj = new this.$.$mol_select()

			obj.value = (val?: any) => this.bind(val)
			obj.options = () => this.bind_options()
			obj.hint = () => this.bind_hint()
			obj.No_options = () => this.Prop_add()
			obj.Trigger_icon = () => null as any

			return obj
		}

		/**
		 * ```tree
		 * bind?val null
		 * ```
		 */
		@ $mol_mem
		bind(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * bind_options /
		 * ```
		 */
		bind_options() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * bind_hint @ \Property..
		 * ```
		 */
		bind_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_field_bind_hint' )
		}

		/**
		 * ```tree
		 * Prop_add $mol_button_minor
		 * 	title <= prop_add_label @ \Add property
		 * 	event_click?val <=> event_prop_add?val null
		 * ```
		 */
		@ $mol_mem
		Prop_add() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.prop_add_label()
			obj.event_click = (val?: any) => this.event_prop_add(val)

			return obj
		}

		/**
		 * ```tree
		 * prop_add_label @ \Add property
		 * ```
		 */
		prop_add_label() {
			return this.$.$mol_locale.text( '$mol_app_studio_field_prop_add_label' )
		}

		/**
		 * ```tree
		 * event_prop_add?val null
		 * ```
		 */
		@ $mol_mem
		event_prop_add(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * List $mol_list rows <= list_rows /
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.list_rows()

			return obj
		}

		/**
		 * ```tree
		 * list_rows /
		 * ```
		 */
		list_rows() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Dict $mol_list rows <= pairs /
		 * ```
		 */
		@ $mol_mem
		Dict() {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.pairs()

			return obj
		}

		/**
		 * ```tree
		 * pairs /
		 * ```
		 */
		pairs() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Overs $mol_list rows <= overs /
		 * ```
		 */
		@ $mol_mem
		Overs() {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.overs()

			return obj
		}

		/**
		 * ```tree
		 * overs /
		 * ```
		 */
		overs() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Add $mol_select
		 * 	hint <= add_hint @ \Add item..
		 * 	value?val <=> add_item?val \
		 * 	dictionary <= item_types *
		 * 		get \<=
		 * 		string \Text
		 * 		number \Number
		 * 		bool \Flag
		 * 		list \List
		 * 		dict \Dictionary
		 * 		null \None
		 * 	Trigger_icon <= List_trigger_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Add() {
			const obj = new this.$.$mol_select()

			obj.hint = () => this.add_hint()
			obj.value = (val?: any) => this.add_item(val)
			obj.dictionary = () => this.item_types()
			obj.Trigger_icon = () => this.List_trigger_icon()

			return obj
		}

		/**
		 * ```tree
		 * add_hint @ \Add item..
		 * ```
		 */
		add_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_field_add_hint' )
		}

		/**
		 * ```tree
		 * add_item?val \
		 * ```
		 */
		@ $mol_mem
		add_item(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * item_types *
		 * 	get \<=
		 * 	string \Text
		 * 	number \Number
		 * 	bool \Flag
		 * 	list \List
		 * 	dict \Dictionary
		 * 	null \None
		 * ```
		 */
		item_types() {
			return {
				get: "<=",
				string: "Text",
				number: "Number",
				bool: "Flag",
				list: "List",
				dict: "Dictionary",
				null: "None"
			}
		}

		/**
		 * ```tree
		 * List_trigger_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		List_trigger_icon() {
			const obj = new this.$.$mol_icon_plus()

			return obj
		}

		/**
		 * ```tree
		 * Add_pair $mol_bar sub /
		 * 	<= Add_pair_key $mol_search
		 * 		hint <= add_pair_hint @ \Add key..
		 * 		query?val <=> add_pair_key?val \
		 * 		suggests <= key_suggests /
		 * 	<= Add_pair_submit $mol_button_minor
		 * 		event_click?val <=> add_pair?val \
		 * 		sub / <= Add_pair_submit_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Add_pair() {
			const obj = new this.$.$mol_bar()

			obj.sub = () => [
				this.Add_pair_key(),
				this.Add_pair_submit()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Add_pair_key $mol_search
		 * 	hint <= add_pair_hint @ \Add key..
		 * 	query?val <=> add_pair_key?val \
		 * 	suggests <= key_suggests /
		 * ```
		 */
		@ $mol_mem
		Add_pair_key() {
			const obj = new this.$.$mol_search()

			obj.hint = () => this.add_pair_hint()
			obj.query = (val?: any) => this.add_pair_key(val)
			obj.suggests = () => this.key_suggests()

			return obj
		}

		/**
		 * ```tree
		 * add_pair_hint @ \Add key..
		 * ```
		 */
		add_pair_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_field_add_pair_hint' )
		}

		/**
		 * ```tree
		 * add_pair_key?val \
		 * ```
		 */
		@ $mol_mem
		add_pair_key(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * key_suggests /
		 * ```
		 */
		key_suggests() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Add_pair_submit $mol_button_minor
		 * 	event_click?val <=> add_pair?val \
		 * 	sub / <= Add_pair_submit_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Add_pair_submit() {
			const obj = new this.$.$mol_button_minor()

			obj.event_click = (val?: any) => this.add_pair(val)
			obj.sub = () => [
				this.Add_pair_submit_icon()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * add_pair?val \
		 * ```
		 */
		@ $mol_mem
		add_pair(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Add_pair_submit_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Add_pair_submit_icon() {
			const obj = new this.$.$mol_icon_plus()

			return obj
		}

		/**
		 * ```tree
		 * Add_over $mol_select
		 * 	hint <= add_over_hint @ \Add override..
		 * 	value?val <=> add_over?val \
		 * 	Trigger_icon <= Overs_trigger_icon $mol_icon_plus
		 * 	options <= over_options /
		 * ```
		 */
		@ $mol_mem
		Add_over() {
			const obj = new this.$.$mol_select()

			obj.hint = () => this.add_over_hint()
			obj.value = (val?: any) => this.add_over(val)
			obj.Trigger_icon = () => this.Overs_trigger_icon()
			obj.options = () => this.over_options()

			return obj
		}

		/**
		 * ```tree
		 * add_over_hint @ \Add override..
		 * ```
		 */
		add_over_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_field_add_over_hint' )
		}

		/**
		 * ```tree
		 * add_over?val \
		 * ```
		 */
		@ $mol_mem
		add_over(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Overs_trigger_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Overs_trigger_icon() {
			const obj = new this.$.$mol_icon_plus()

			return obj
		}

		/**
		 * ```tree
		 * over_options /
		 * ```
		 */
		over_options() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Prop!id $mol_app_studio_field
		 * 	path <= prop_path!id /
		 * 	prop_arg!id <= prop_arg!id *
		 * 	prop!path?val <=> prop!path?val $mol_tree
		 * 	props!name?val <=> props!name?val $mol_tree
		 * 	prop_value!id <= prop_value!id null
		 * 	bind_options <= bind_options /
		 * 	prop_add?val <=> prop_add?val null
		 * 	object_options <= object_options /
		 * ```
		 */
		@ $mol_mem_key
		Prop(id: any) {
			const obj = new this.$.$mol_app_studio_field()

			obj.path = () => this.prop_path(id)
			obj.prop_arg = (id: any) => this.prop_arg(id)
			obj.prop = (path: any, val?: any) => this.prop(path, val)
			obj.props = (name: any, val?: any) => this.props(name, val)
			obj.prop_value = (id: any) => this.prop_value(id)
			obj.bind_options = () => this.bind_options()
			obj.prop_add = (val?: any) => this.prop_add(val)
			obj.object_options = () => this.object_options()

			return obj
		}

		/**
		 * ```tree
		 * prop_path!id /
		 * ```
		 */
		prop_path(id: any) {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * prop_arg!id *
		 * ```
		 */
		prop_arg(id: any) {
			return {

			}
		}

		/**
		 * ```tree
		 * prop!path?val $mol_tree
		 * ```
		 */
		@ $mol_mem_key
		prop(path: any, val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_tree()

			return obj
		}

		/**
		 * ```tree
		 * props!name?val $mol_tree
		 * ```
		 */
		@ $mol_mem_key
		props(name: any, val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_tree()

			return obj
		}

		/**
		 * ```tree
		 * prop_value!id null
		 * ```
		 */
		prop_value(id: any) {
			return null as any
		}

		/**
		 * ```tree
		 * prop_add?val null
		 * ```
		 */
		@ $mol_mem
		prop_add(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}
	}

	export class $mol_app_studio_field_title extends $mol_check_expand {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_app_studio_field_title_type <= type \null
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_app_studio_field_title_type: this.type()
			}
		}

		/**
		 * ```tree
		 * type \null
		 * ```
		 */
		type() {
			return "null"
		}
	}

}
