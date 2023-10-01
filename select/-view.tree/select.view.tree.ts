namespace $ {
	export class $mol_select extends $mol_pick {
		
		/**
		 * ```tree
		 * dictionary? *
		 * ```
		 */
		@ $mol_mem
		dictionary(next?: any) {
			if ( next !== undefined ) return next as never
			return {
			} as Record< string, any >
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
		 * value? \
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * option_label_default \
		 * ```
		 */
		option_label_default() {
			return ""
		}
		
		/**
		 * ```tree
		 * Option_row* $mol_button_minor
		 * 	event_click?event <=> event_select*?event
		 * 	sub <= option_content*
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
		 * No_options $mol_view sub / <= no_options_message
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
		 * plugins /
		 * 	^
		 * 	<= Nav
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
		 * hint @ \Pick..
		 * ```
		 */
		hint() {
			return this.$.$mol_locale.text( '$mol_select_hint' )
		}
		
		/**
		 * ```tree
		 * bubble_content /
		 * 	<= Filter
		 * 	<= Bubble_pane
		 * ```
		 */
		bubble_content() {
			return [
				this.Filter(),
				this.Bubble_pane()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Filter $mol_search
		 * 	query? <=> filter_pattern?
		 * 	hint <= filter_hint
		 * 	submit?event <=> submit?event
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem
		Filter() {
			const obj = new this.$.$mol_search()
			
			obj.query = (next?: any) => this.filter_pattern(next)
			obj.hint = () => this.filter_hint()
			obj.submit = (event?: any) => this.submit(event)
			obj.enabled = () => this.enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Trigger_icon $mol_icon_dots_vertical
		 * ```
		 */
		@ $mol_mem
		Trigger_icon() {
			const obj = new this.$.$mol_icon_dots_vertical()
			
			return obj
		}
		
		/**
		 * ```tree
		 * event_select*?event null
		 * ```
		 */
		@ $mol_mem_key
		event_select(id: any, event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * option_label* \
		 * ```
		 */
		option_label(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * filter_pattern? \
		 * ```
		 */
		@ $mol_mem
		filter_pattern(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Option_label* $mol_dimmer
		 * 	haystack <= option_label*
		 * 	needle <= filter_pattern?
		 * ```
		 */
		@ $mol_mem_key
		Option_label(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => this.option_label(id)
			obj.needle = () => this.filter_pattern()
			
			return obj
		}
		
		/**
		 * ```tree
		 * option_content* / <= Option_label*
		 * ```
		 */
		option_content(id: any) {
			return [
				this.Option_label(id)
			] as readonly any[]
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
			if ( component !== undefined ) return component as never
			return null as any
		}
		
		/**
		 * ```tree
		 * nav_cycle? true
		 * ```
		 */
		@ $mol_mem
		nav_cycle(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Nav $mol_nav
		 * 	keys_y <= nav_components
		 * 	current_y?component <=> option_focused?component
		 * 	cycle? <=> nav_cycle?
		 * ```
		 */
		@ $mol_mem
		Nav() {
			const obj = new this.$.$mol_nav()
			
			obj.keys_y = () => this.nav_components()
			obj.current_y = (component?: any) => this.option_focused(component)
			obj.cycle = (next?: any) => this.nav_cycle(next)
			
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
		 * Menu $mol_list rows <= menu_content
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
		 * Bubble_pane $mol_scroll sub / <= Menu
		 * ```
		 */
		@ $mol_mem
		Bubble_pane() {
			const obj = new this.$.$mol_scroll()
			
			obj.sub = () => [
				this.Menu()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * filter_hint @ \Filter..
		 * ```
		 */
		filter_hint() {
			return this.$.$mol_locale.text( '$mol_select_filter_hint' )
		}
		
		/**
		 * ```tree
		 * submit?event null
		 * ```
		 */
		@ $mol_mem
		submit(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}
	}
	
}

