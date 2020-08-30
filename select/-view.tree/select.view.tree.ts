namespace $ {
	export class $mol_select extends $mol_pop {

		/**
		 * ```tree
		 * dictionary *
		 * ```
		 */
		dictionary() {
			return {

			}
		}

		/**
		 * ```tree
		 * options /string
		 * ```
		 */
		options() {
			return [

			] as readonly string[]
		}

		/**
		 * ```tree
		 * value?val \
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * minimal_height 40
		 * ```
		 */
		minimal_height() {
			return 40
		}

		/**
		 * ```tree
		 * Option_row!id $mol_button_minor
		 * 	event_click?event <=> event_select!id?event null
		 * 	sub <= option_content!id / <= Option_label!id $mol_dimmer
		 * 		minimal_height 40
		 * 		haystack <= option_label!id \
		 * 		needle <= filter_pattern?val \
		 * ```
		 */
		@ $mol_mem_key
		Option_row(id: any) {
			const obj = new this.$.$mol_button_minor()

			obj.event_click = (event?: any) => this.event_select(id, event)
			obj.sub = () => this.option_content(id)

			return obj
		}

		/**
		 * ```tree
		 * event_select!id?event null
		 * ```
		 */
		@ $mol_mem_key
		event_select(id: any, event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * option_content!id / <= Option_label!id $mol_dimmer
		 * 	minimal_height 40
		 * 	haystack <= option_label!id \
		 * 	needle <= filter_pattern?val \
		 * ```
		 */
		option_content(id: any) {
			return [
				this.Option_label(id)
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Option_label!id $mol_dimmer
		 * 	minimal_height 40
		 * 	haystack <= option_label!id \
		 * 	needle <= filter_pattern?val \
		 * ```
		 */
		@ $mol_mem_key
		Option_label(id: any) {
			const obj = new this.$.$mol_dimmer()

			obj.minimal_height = () => 40
			obj.haystack = () => this.option_label(id)
			obj.needle = () => this.filter_pattern()

			return obj
		}

		/**
		 * ```tree
		 * option_label!id \
		 * ```
		 */
		option_label(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * filter_pattern?val \
		 * ```
		 */
		@ $mol_mem
		filter_pattern(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * No_options $mol_view sub / <= no_options_message @ \No options
		 * ```
		 */
		@ $mol_mem
		No_options() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.no_options_message()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * no_options_message @ \No options
		 * ```
		 */
		no_options_message() {
			return this.$.$mol_locale.text( '$mol_select_no_options_message' )
		}

		/**
		 * ```tree
		 * plugins /
		 * 	^
		 * 	<= Nav $mol_nav
		 * 		keys_y <= nav_components /$mol_view
		 * 		current_y?component <=> option_focused?component null
		 * 		cycle?val <=> nav_cycle?val true
		 * ```
		 */
		plugins() {
			return [
				...super.plugins(),
				this.Nav()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Nav $mol_nav
		 * 	keys_y <= nav_components /$mol_view
		 * 	current_y?component <=> option_focused?component null
		 * 	cycle?val <=> nav_cycle?val true
		 * ```
		 */
		@ $mol_mem
		Nav() {
			const obj = new this.$.$mol_nav()

			obj.keys_y = () => this.nav_components()
			obj.current_y = (component?: any) => this.option_focused(component)
			obj.cycle = (val?: any) => this.nav_cycle(val)

			return obj
		}

		/**
		 * ```tree
		 * nav_components /$mol_view
		 * ```
		 */
		nav_components() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * option_focused?component null
		 * ```
		 */
		@ $mol_mem
		option_focused(component?: any) {
			if ( component !== undefined ) return component
			return null as any
		}

		/**
		 * ```tree
		 * nav_cycle?val true
		 * ```
		 */
		@ $mol_mem
		nav_cycle(val?: any) {
			if ( val !== undefined ) return val
			return true
		}

		/**
		 * ```tree
		 * showed?val <=> options_showed?val false
		 * ```
		 */
		showed(val?: any) {
			return this.options_showed(val)
		}

		/**
		 * ```tree
		 * options_showed?val false
		 * ```
		 */
		@ $mol_mem
		options_showed(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Anchor <= Trigger $mol_button_minor
		 * 	click?event <=> open?event null
		 * 	sub <= trigger_content /$mol_view_content
		 * ```
		 */
		Anchor() {
			return this.Trigger()
		}

		/**
		 * ```tree
		 * Trigger $mol_button_minor
		 * 	click?event <=> open?event null
		 * 	sub <= trigger_content /$mol_view_content
		 * ```
		 */
		@ $mol_mem
		Trigger() {
			const obj = new this.$.$mol_button_minor()

			obj.click = (event?: any) => this.open(event)
			obj.sub = () => this.trigger_content()

			return obj
		}

		/**
		 * ```tree
		 * open?event null
		 * ```
		 */
		@ $mol_mem
		open(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * trigger_content /$mol_view_content
		 * ```
		 */
		trigger_content() {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * bubble_content / <= Menu $mol_list rows <= menu_content /$mol_view
		 * ```
		 */
		bubble_content() {
			return [
				this.Menu()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Menu $mol_list rows <= menu_content /$mol_view
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.menu_content()

			return obj
		}

		/**
		 * ```tree
		 * menu_content /$mol_view
		 * ```
		 */
		menu_content() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * option_content_current /$mol_view_content
		 * ```
		 */
		option_content_current() {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * Filter $mol_string
		 * 	value?val <=> filter_pattern?val \
		 * 	hint <= filter_hint <= hint @ \Search..
		 * 	submit?event <=> submit?event null
		 * ```
		 */
		@ $mol_mem
		Filter() {
			const obj = new this.$.$mol_string()

			obj.value = (val?: any) => this.filter_pattern(val)
			obj.hint = () => this.filter_hint()
			obj.submit = (event?: any) => this.submit(event)

			return obj
		}

		/**
		 * ```tree
		 * filter_hint <= hint @ \Search..
		 * ```
		 */
		filter_hint() {
			return this.hint()
		}

		/**
		 * ```tree
		 * hint @ \Search..
		 * ```
		 */
		hint() {
			return this.$.$mol_locale.text( '$mol_select_hint' )
		}

		/**
		 * ```tree
		 * submit?event null
		 * ```
		 */
		@ $mol_mem
		submit(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * Trigger_icon $mol_icon_chevron
		 * ```
		 */
		@ $mol_mem
		Trigger_icon() {
			const obj = new this.$.$mol_icon_chevron()

			return obj
		}
	}

}
