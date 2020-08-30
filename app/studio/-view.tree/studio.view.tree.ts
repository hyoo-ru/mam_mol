namespace $ {
	export class $mol_app_studio extends $mol_book {

		/**
		 * ```tree
		 * value_overrided!id?val null
		 * ```
		 */
		@ $mol_mem_key
		value_overrided(id: any, val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}


		/**
		 * ```tree
		 * tools_main /
		 * ```
		 */
		tools_main() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * pages /
		 * 	<= Preview_page $mol_page
		 * 		title <= preview_title @ \Preview: 
		 * 		tools <= preview_tools /
		 * 			<= Source_link $mol_link
		 * 				hint <= source_title
		 * 				sub / <= Source_icon $mol_icon_source
		 * 				arg <= source_arg *
		 * 					source \
		 * 					path null
		 * 			<= Edit $mol_link
		 * 				hint <= editor_title
		 * 				sub / <= Edit_icon $mol_icon_settings
		 * 				arg *
		 * 					path \
		 * 					source null
		 * 		body / <= Selector $mol_app_studio_selector
		 * 			sub / <= Block $mol_view
		 * 			path?val <=> path?val /
		 * 		minimal_width 400
		 * 	<= Editor_page $mol_page
		 * 		plugins / <= Speech_filter $mol_speech
		 * 			event_catch?val <=> speech_filter?val null
		 * 			patterns <= speech_filter_patterns / \find (.+?)
		 * 		title <= editor_title @ \Properties
		 * 		event_top?val <=> event_front_up?val
		 * 		tools /
		 * 			- <= Speech_toggle $mol_check_icon
		 * 				Icon <= Speech_toggle_icon $mol_icon_microphone
		 * 				checked?val <=> speech_enabled?val false
		 * 				hint <= speech_toggle_hint @ \Speech contol
		 * 			<= Editor_close $mol_link
		 * 				sub / <= Editor_close_icon $mol_icon_cross
		 * 				arg <= editor_close_arg * path null
		 * 		body /
		 * 			<= Filter_bar $mol_bar sub <= filter_bar_items /
		 * 				<= Filter $mol_search
		 * 					hint <= filter_hint @ \Filter properties
		 * 					query?val <=> prop_filter?val \
		 * 				<= Prop_add $mol_button_minor
		 * 					event_click?val <=> event_add?val null
		 * 					sub / <= Prop_add_icon $mol_icon_plus
		 * 					hint <= prop_add_hint @ \Add this property
		 * 			<= Fields $mol_list rows <= fields /
		 * 		minimal_width 400
		 * 	<= Source_page $mol_page
		 * 		title <= source_title @ \Source code
		 * 		minimal_width 400
		 * 		tools / <= Source_close $mol_link
		 * 			sub / <= Source_close_icon $mol_icon_cross
		 * 			arg <= source_close_arg * source null
		 * 		body / <= Source $mol_text text <= source \
		 * ```
		 */
		pages() {
			return [
				this.Preview_page(),
				this.Editor_page(),
				this.Source_page()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Preview_page $mol_page
		 * 	title <= preview_title @ \Preview: 
		 * 	tools <= preview_tools /
		 * 		<= Source_link $mol_link
		 * 			hint <= source_title
		 * 			sub / <= Source_icon $mol_icon_source
		 * 			arg <= source_arg *
		 * 				source \
		 * 				path null
		 * 		<= Edit $mol_link
		 * 			hint <= editor_title
		 * 			sub / <= Edit_icon $mol_icon_settings
		 * 			arg *
		 * 				path \
		 * 				source null
		 * 	body / <= Selector $mol_app_studio_selector
		 * 		sub / <= Block $mol_view
		 * 		path?val <=> path?val /
		 * 	minimal_width 400
		 * ```
		 */
		@ $mol_mem
		Preview_page() {
			const obj = new this.$.$mol_page()

			obj.title = () => this.preview_title()
			obj.tools = () => this.preview_tools()
			obj.body = () => [
				this.Selector()
			] as readonly any[]
			obj.minimal_width = () => 400

			return obj
		}

		/**
		 * ```tree
		 * preview_title @ \Preview:
		 * ```
		 */
		preview_title() {
			return this.$.$mol_locale.text( '$mol_app_studio_preview_title' )
		}

		/**
		 * ```tree
		 * preview_tools /
		 * 	<= Source_link $mol_link
		 * 		hint <= source_title
		 * 		sub / <= Source_icon $mol_icon_source
		 * 		arg <= source_arg *
		 * 			source \
		 * 			path null
		 * 	<= Edit $mol_link
		 * 		hint <= editor_title
		 * 		sub / <= Edit_icon $mol_icon_settings
		 * 		arg *
		 * 			path \
		 * 			source null
		 * ```
		 */
		preview_tools() {
			return [
				this.Source_link(),
				this.Edit()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Source_link $mol_link
		 * 	hint <= source_title
		 * 	sub / <= Source_icon $mol_icon_source
		 * 	arg <= source_arg *
		 * 		source \
		 * 		path null
		 * ```
		 */
		@ $mol_mem
		Source_link() {
			const obj = new this.$.$mol_link()

			obj.hint = () => this.source_title()
			obj.sub = () => [
				this.Source_icon()
			] as readonly any[]
			obj.arg = () => this.source_arg()

			return obj
		}

		/**
		 * ```tree
		 * Source_icon $mol_icon_source
		 * ```
		 */
		@ $mol_mem
		Source_icon() {
			const obj = new this.$.$mol_icon_source()

			return obj
		}

		/**
		 * ```tree
		 * source_arg *
		 * 	source \
		 * 	path null
		 * ```
		 */
		source_arg() {
			return {
				source: "",
				path: null as any
			}
		}

		/**
		 * ```tree
		 * Edit $mol_link
		 * 	hint <= editor_title
		 * 	sub / <= Edit_icon $mol_icon_settings
		 * 	arg *
		 * 		path \
		 * 		source null
		 * ```
		 */
		@ $mol_mem
		Edit() {
			const obj = new this.$.$mol_link()

			obj.hint = () => this.editor_title()
			obj.sub = () => [
				this.Edit_icon()
			] as readonly any[]
			obj.arg = () => ({
				path: "",
				source: null as any
			})

			return obj
		}

		/**
		 * ```tree
		 * Edit_icon $mol_icon_settings
		 * ```
		 */
		@ $mol_mem
		Edit_icon() {
			const obj = new this.$.$mol_icon_settings()

			return obj
		}

		/**
		 * ```tree
		 * Selector $mol_app_studio_selector
		 * 	sub / <= Block $mol_view
		 * 	path?val <=> path?val /
		 * ```
		 */
		@ $mol_mem
		Selector() {
			const obj = new this.$.$mol_app_studio_selector()

			obj.sub = () => [
				this.Block()
			] as readonly any[]
			obj.path = (val?: any) => this.path(val)

			return obj
		}

		/**
		 * ```tree
		 * Block $mol_view
		 * ```
		 */
		@ $mol_mem
		Block() {
			const obj = new this.$.$mol_view()

			return obj
		}

		/**
		 * ```tree
		 * path?val /
		 * ```
		 */
		@ $mol_mem
		path(val?: any) {
			if ( val !== undefined ) return val
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Editor_page $mol_page
		 * 	plugins / <= Speech_filter $mol_speech
		 * 		event_catch?val <=> speech_filter?val null
		 * 		patterns <= speech_filter_patterns / \find (.+?)
		 * 	title <= editor_title @ \Properties
		 * 	event_top?val <=> event_front_up?val
		 * 	tools /
		 * 		- <= Speech_toggle $mol_check_icon
		 * 			Icon <= Speech_toggle_icon $mol_icon_microphone
		 * 			checked?val <=> speech_enabled?val false
		 * 			hint <= speech_toggle_hint @ \Speech contol
		 * 		<= Editor_close $mol_link
		 * 			sub / <= Editor_close_icon $mol_icon_cross
		 * 			arg <= editor_close_arg * path null
		 * 	body /
		 * 		<= Filter_bar $mol_bar sub <= filter_bar_items /
		 * 			<= Filter $mol_search
		 * 				hint <= filter_hint @ \Filter properties
		 * 				query?val <=> prop_filter?val \
		 * 			<= Prop_add $mol_button_minor
		 * 				event_click?val <=> event_add?val null
		 * 				sub / <= Prop_add_icon $mol_icon_plus
		 * 				hint <= prop_add_hint @ \Add this property
		 * 		<= Fields $mol_list rows <= fields /
		 * 	minimal_width 400
		 * ```
		 */
		@ $mol_mem
		Editor_page() {
			const obj = new this.$.$mol_page()

			obj.plugins = () => [
				this.Speech_filter()
			] as readonly any[]
			obj.title = () => this.editor_title()
			obj.event_top = (val?: any) => this.event_front_up(val)
			obj.tools = () => [
				// <=
				this.Editor_close()
			] as readonly any[]
			obj.body = () => [
				this.Filter_bar(),
				this.Fields()
			] as readonly any[]
			obj.minimal_width = () => 400

			return obj
		}

		/**
		 * ```tree
		 * Speech_filter $mol_speech
		 * 	event_catch?val <=> speech_filter?val null
		 * 	patterns <= speech_filter_patterns / \find (.+?)
		 * ```
		 */
		@ $mol_mem
		Speech_filter() {
			const obj = new this.$.$mol_speech()

			obj.event_catch = (val?: any) => this.speech_filter(val)
			obj.patterns = () => this.speech_filter_patterns()

			return obj
		}

		/**
		 * ```tree
		 * speech_filter?val null
		 * ```
		 */
		@ $mol_mem
		speech_filter(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * speech_filter_patterns / \find (.+?)
		 * ```
		 */
		speech_filter_patterns() {
			return [
				"find (.+?)"
			] as readonly any[]
		}

		/**
		 * ```tree
		 * editor_title @ \Properties
		 * ```
		 */
		editor_title() {
			return this.$.$mol_locale.text( '$mol_app_studio_editor_title' )
		}

		/**
		 * ```tree
		 * Editor_close $mol_link
		 * 	sub / <= Editor_close_icon $mol_icon_cross
		 * 	arg <= editor_close_arg * path null
		 * ```
		 */
		@ $mol_mem
		Editor_close() {
			const obj = new this.$.$mol_link()

			obj.sub = () => [
				this.Editor_close_icon()
			] as readonly any[]
			obj.arg = () => this.editor_close_arg()

			return obj
		}

		/**
		 * ```tree
		 * Editor_close_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Editor_close_icon() {
			const obj = new this.$.$mol_icon_cross()

			return obj
		}

		/**
		 * ```tree
		 * editor_close_arg * path null
		 * ```
		 */
		editor_close_arg() {
			return {
				path: null as any
			}
		}

		/**
		 * ```tree
		 * Filter_bar $mol_bar sub <= filter_bar_items /
		 * 	<= Filter $mol_search
		 * 		hint <= filter_hint @ \Filter properties
		 * 		query?val <=> prop_filter?val \
		 * 	<= Prop_add $mol_button_minor
		 * 		event_click?val <=> event_add?val null
		 * 		sub / <= Prop_add_icon $mol_icon_plus
		 * 		hint <= prop_add_hint @ \Add this property
		 * ```
		 */
		@ $mol_mem
		Filter_bar() {
			const obj = new this.$.$mol_bar()

			obj.sub = () => this.filter_bar_items()

			return obj
		}

		/**
		 * ```tree
		 * filter_bar_items /
		 * 	<= Filter $mol_search
		 * 		hint <= filter_hint @ \Filter properties
		 * 		query?val <=> prop_filter?val \
		 * 	<= Prop_add $mol_button_minor
		 * 		event_click?val <=> event_add?val null
		 * 		sub / <= Prop_add_icon $mol_icon_plus
		 * 		hint <= prop_add_hint @ \Add this property
		 * ```
		 */
		filter_bar_items() {
			return [
				this.Filter(),
				this.Prop_add()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Filter $mol_search
		 * 	hint <= filter_hint @ \Filter properties
		 * 	query?val <=> prop_filter?val \
		 * ```
		 */
		@ $mol_mem
		Filter() {
			const obj = new this.$.$mol_search()

			obj.hint = () => this.filter_hint()
			obj.query = (val?: any) => this.prop_filter(val)

			return obj
		}

		/**
		 * ```tree
		 * filter_hint @ \Filter properties
		 * ```
		 */
		filter_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_filter_hint' )
		}

		/**
		 * ```tree
		 * prop_filter?val \
		 * ```
		 */
		@ $mol_mem
		prop_filter(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Prop_add $mol_button_minor
		 * 	event_click?val <=> event_add?val null
		 * 	sub / <= Prop_add_icon $mol_icon_plus
		 * 	hint <= prop_add_hint @ \Add this property
		 * ```
		 */
		@ $mol_mem
		Prop_add() {
			const obj = new this.$.$mol_button_minor()

			obj.event_click = (val?: any) => this.event_add(val)
			obj.sub = () => [
				this.Prop_add_icon()
			] as readonly any[]
			obj.hint = () => this.prop_add_hint()

			return obj
		}

		/**
		 * ```tree
		 * event_add?val null
		 * ```
		 */
		@ $mol_mem
		event_add(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Prop_add_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Prop_add_icon() {
			const obj = new this.$.$mol_icon_plus()

			return obj
		}

		/**
		 * ```tree
		 * prop_add_hint @ \Add this property
		 * ```
		 */
		prop_add_hint() {
			return this.$.$mol_locale.text( '$mol_app_studio_prop_add_hint' )
		}

		/**
		 * ```tree
		 * Fields $mol_list rows <= fields /
		 * ```
		 */
		@ $mol_mem
		Fields() {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.fields()

			return obj
		}

		/**
		 * ```tree
		 * fields /
		 * ```
		 */
		fields() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Source_page $mol_page
		 * 	title <= source_title @ \Source code
		 * 	minimal_width 400
		 * 	tools / <= Source_close $mol_link
		 * 		sub / <= Source_close_icon $mol_icon_cross
		 * 		arg <= source_close_arg * source null
		 * 	body / <= Source $mol_text text <= source \
		 * ```
		 */
		@ $mol_mem
		Source_page() {
			const obj = new this.$.$mol_page()

			obj.title = () => this.source_title()
			obj.minimal_width = () => 400
			obj.tools = () => [
				this.Source_close()
			] as readonly any[]
			obj.body = () => [
				this.Source()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * source_title @ \Source code
		 * ```
		 */
		source_title() {
			return this.$.$mol_locale.text( '$mol_app_studio_source_title' )
		}

		/**
		 * ```tree
		 * Source_close $mol_link
		 * 	sub / <= Source_close_icon $mol_icon_cross
		 * 	arg <= source_close_arg * source null
		 * ```
		 */
		@ $mol_mem
		Source_close() {
			const obj = new this.$.$mol_link()

			obj.sub = () => [
				this.Source_close_icon()
			] as readonly any[]
			obj.arg = () => this.source_close_arg()

			return obj
		}

		/**
		 * ```tree
		 * Source_close_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Source_close_icon() {
			const obj = new this.$.$mol_icon_cross()

			return obj
		}

		/**
		 * ```tree
		 * source_close_arg * source null
		 * ```
		 */
		source_close_arg() {
			return {
				source: null as any
			}
		}

		/**
		 * ```tree
		 * Source $mol_text text <= source \
		 * ```
		 */
		@ $mol_mem
		Source() {
			const obj = new this.$.$mol_text()

			obj.text = () => this.source()

			return obj
		}

		/**
		 * ```tree
		 * source \
		 * ```
		 */
		source() {
			return ""
		}

		/**
		 * ```tree
		 * Placeholder null
		 * ```
		 */
		Placeholder() {
			return null as any
		}


		/**
		 * ```tree
		 * Prop!id $mol_app_studio_field
		 * 	path <= prop_path!id /
		 * 	prop!path?val <=> prop_default!path?val $mol_tree2_empty
		 * 	props!name?val <=> props_all!name?val $mol_tree2_empty
		 * 	prop_arg!id <= prop_arg!id *
		 * 	prop_value!id <= prop_value_base!id null
		 * 	bind_options <= prop_options /
		 * 	object_options <= view_options /
		 * 	prop_add?val <=> prop_add?val \
		 * 	highlight <= prop_filter
		 * ```
		 */
		@ $mol_mem_key
		Prop(id: any) {
			const obj = new this.$.$mol_app_studio_field()

			obj.path = () => this.prop_path(id)
			obj.prop = (path: any, val?: any) => this.prop_default(path, val)
			obj.props = (name: any, val?: any) => this.props_all(name, val)
			obj.prop_arg = (id: any) => this.prop_arg(id)
			obj.prop_value = (id: any) => this.prop_value_base(id)
			obj.bind_options = () => this.prop_options()
			obj.object_options = () => this.view_options()
			obj.prop_add = (val?: any) => this.prop_add(val)
			obj.highlight = () => this.prop_filter()

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
		 * prop_default!path?val $mol_tree2_empty
		 * ```
		 */
		@ $mol_mem_key
		prop_default(path: any, val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_tree2_empty()

			return obj
		}

		/**
		 * ```tree
		 * props_all!name?val $mol_tree2_empty
		 * ```
		 */
		@ $mol_mem_key
		props_all(name: any, val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_tree2_empty()

			return obj
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
		 * prop_value_base!id null
		 * ```
		 */
		prop_value_base(id: any) {
			return null as any
		}

		/**
		 * ```tree
		 * prop_options /
		 * ```
		 */
		prop_options() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * view_options /
		 * ```
		 */
		view_options() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * prop_add?val \
		 * ```
		 */
		@ $mol_mem
		prop_add(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}


		/**
		 * ```tree
		 * class_name_self?val \$mol_app_studio_generated
		 * ```
		 */
		@ $mol_mem
		class_name_self(val?: any) {
			if ( val !== undefined ) return val
			return "$mol_app_studio_generated"
		}

		/**
		 * ```tree
		 * class_name_base?val \$mol_view
		 * ```
		 */
		@ $mol_mem
		class_name_base(val?: any) {
			if ( val !== undefined ) return val
			return "$mol_view"
		}

		/**
		 * ```tree
		 * class_self?val $mol_tree2_empty
		 * ```
		 */
		@ $mol_mem
		class_self(val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_tree2_empty()

			return obj
		}

		/**
		 * ```tree
		 * classes $mol_tree2_empty
		 * ```
		 */
		@ $mol_mem
		classes() {
			const obj = new this.$.$mol_tree2_empty()

			return obj
		}
	}

	export class $mol_app_studio_selector extends $mol_view {

		/**
		 * ```tree
		 * event *
		 * 	contextmenu?event <=> select?event null
		 * 	dblclick?event <=> select?event null
		 * ```
		 */
		event() {
			return {
				contextmenu: (event?: any) => this.select(event),
				dblclick: (event?: any) => this.select(event)
			}
		}

		/**
		 * ```tree
		 * select?event null
		 * ```
		 */
		@ $mol_mem
		select(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * path?val /
		 * ```
		 */
		@ $mol_mem
		path(val?: any) {
			if ( val !== undefined ) return val
			return [

			] as readonly any[]
		}
	}

}
