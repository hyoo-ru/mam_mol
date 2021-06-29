namespace $ {
	export class $mol_search extends $mol_pop {
		
		/**
		 * ```tree
		 * query?val \
		 * ```
		 */
		@ $mol_mem
		query(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * showed?val <=> suggests_showed?val
		 * ```
		 */
		showed(val?: any) {
			return this.suggests_showed(val)
		}
		
		/**
		 * ```tree
		 * Anchor <= Query
		 * ```
		 */
		Anchor() {
			return this.Query()
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
		 * Suggest!id $mol_button_minor
		 * 	click?event <=> suggest_select!id?event
		 * 	sub <= suggest_content!id
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
		 * clear?val null
		 * ```
		 */
		@ $mol_mem
		clear(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Hotkey $mol_hotkey key * escape?val <=> clear?val
		 * ```
		 */
		@ $mol_mem
		Hotkey() {
			const obj = new this.$.$mol_hotkey()
			
			obj.key = () => ({
				escape: (val?: any) => this.clear(val)
			})
			
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
		 * suggests_showed?val false
		 * ```
		 */
		@ $mol_mem
		suggests_showed(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * Query $mol_string
		 * 	value?val <=> query?val
		 * 	hint <= hint
		 * 	submit?event <=> submit?event
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem
		Query() {
			const obj = new this.$.$mol_string()
			
			obj.value = (val?: any) => this.query(val)
			obj.hint = () => this.hint()
			obj.submit = (event?: any) => this.submit(event)
			obj.enabled = () => this.enabled()
			
			return obj
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
		 * suggest_select!id?event null
		 * ```
		 */
		@ $mol_mem_key
		suggest_select(id: any, event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * suggest_label!id \
		 * ```
		 */
		suggest_label(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Suggest_label!id $mol_dimmer
		 * 	haystack <= suggest_label!id
		 * 	needle <= query?val
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
		 * suggest_content!id /$mol_view_content <= Suggest_label!id
		 * ```
		 */
		suggest_content(id: any) {
			return [
				this.Suggest_label(id)
			] as readonly $mol_view_content[]
		}
	}
	
}

