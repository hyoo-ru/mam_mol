namespace $ {
	export class $mol_search extends $mol_pop {
		
		/**
		 * ```tree
		 * query? \
		 * ```
		 */
		@ $mol_mem
		query(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * suggests /string
		 * ```
		 */
		suggests() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * plugins /$mol_plugin
		 * 	^
		 * 	<= Hotkey
		 * 	<= Nav
		 * ```
		 */
		plugins() {
			return [
				...super.plugins(),
				this.Hotkey(),
				this.Nav()
			] as readonly $mol_plugin[]
		}
		
		/**
		 * ```tree
		 * showed? <=> suggests_showed?
		 * ```
		 */
		showed(next?: any) {
			return this.suggests_showed(next)
		}
		
		/**
		 * ```tree
		 * align_hor \right
		 * ```
		 */
		align_hor() {
			return "right"
		}
		
		/**
		 * ```tree
		 * Anchor $mol_view sub <= anchor_content
		 * ```
		 */
		@ $mol_mem
		Anchor() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => this.anchor_content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * bubble_content /$mol_view_content <= Menu
		 * ```
		 */
		bubble_content() {
			return [
				this.Menu()
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * Suggest* $mol_button_minor
		 * 	click?event <=> suggest_select*?event
		 * 	sub <= suggest_content*
		 * ```
		 */
		@ $mol_mem_key
		Suggest(id: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.click = (event?: any) => this.suggest_select(id, event)
			obj.sub = () => this.suggest_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * clear? null
		 * ```
		 */
		@ $mol_mem
		clear(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Hotkey $mol_hotkey key * escape? <=> clear?
		 * ```
		 */
		@ $mol_mem
		Hotkey() {
			const obj = new this.$.$mol_hotkey()
			
			obj.key = () => ({
				escape: (next?: any) => this.clear(next)
			} as Record< string, any >)
			
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
		 * nav_focused?component null
		 * ```
		 */
		@ $mol_mem
		nav_focused(component?: any) {
			if ( component !== undefined ) return component as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Nav $mol_nav
		 * 	keys_y <= nav_components
		 * 	current_y?component <=> nav_focused?component
		 * ```
		 */
		@ $mol_mem
		Nav() {
			const obj = new this.$.$mol_nav()
			
			obj.keys_y = () => this.nav_components()
			obj.current_y = (component?: any) => this.nav_focused(component)
			
			return obj
		}
		
		/**
		 * ```tree
		 * suggests_showed? false
		 * ```
		 */
		@ $mol_mem
		suggests_showed(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * hint @ \Search...
		 * ```
		 */
		hint() {
			return this.$.$mol_locale.text( '$mol_search_hint' )
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
		
		/**
		 * ```tree
		 * keyboard \search
		 * ```
		 */
		keyboard() {
			return "search"
		}
		
		/**
		 * ```tree
		 * enter \search
		 * ```
		 */
		enter() {
			return "search"
		}
		
		/**
		 * ```tree
		 * bring
		 * ```
		 */
		bring() {
			return this.Query().bring()
		}
		
		/**
		 * ```tree
		 * Query $mol_string
		 * 	value? <=> query?
		 * 	hint <= hint
		 * 	submit?event <=> submit?event
		 * 	enabled <= enabled
		 * 	keyboard <= keyboard
		 * 	enter <= enter
		 * 	bring => bring
		 * ```
		 */
		@ $mol_mem
		Query() {
			const obj = new this.$.$mol_string()
			
			obj.value = (next?: any) => this.query(next)
			obj.hint = () => this.hint()
			obj.submit = (event?: any) => this.submit(event)
			obj.enabled = () => this.enabled()
			obj.keyboard = () => this.keyboard()
			obj.enter = () => this.enter()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Clear_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Clear_icon() {
			const obj = new this.$.$mol_icon_cross()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Clear $mol_button_minor
		 * 	hint @ \Clear
		 * 	click?event <=> clear?event
		 * 	sub / <= Clear_icon
		 * ```
		 */
		@ $mol_mem
		Clear() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.$.$mol_locale.text( '$mol_search_Clear_hint' )
			obj.click = (event?: any) => this.clear(event)
			obj.sub = () => [
				this.Clear_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * anchor_content /
		 * 	<= Query
		 * 	<= Clear
		 * ```
		 */
		anchor_content() {
			return [
				this.Query(),
				this.Clear()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * menu_items /$mol_view
		 * ```
		 */
		menu_items() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Menu $mol_list rows <= menu_items
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.menu_items()
			
			return obj
		}
		
		/**
		 * ```tree
		 * suggest_select*?event null
		 * ```
		 */
		@ $mol_mem_key
		suggest_select(id: any, event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * suggest_label* \
		 * ```
		 */
		suggest_label(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Suggest_label* $mol_dimmer
		 * 	haystack <= suggest_label*
		 * 	needle <= query?
		 * ```
		 */
		@ $mol_mem_key
		Suggest_label(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => this.suggest_label(id)
			obj.needle = () => this.query()
			
			return obj
		}
		
		/**
		 * ```tree
		 * suggest_content* /$mol_view_content <= Suggest_label*
		 * ```
		 */
		suggest_content(id: any) {
			return [
				this.Suggest_label(id)
			] as readonly $mol_view_content[]
		}
	}
	
}

