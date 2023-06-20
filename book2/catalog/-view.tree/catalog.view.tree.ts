namespace $ {
	export class $mol_book2_catalog extends $mol_book2 {
		
		/**
		 * ```tree
		 * param \
		 * ```
		 */
		param() {
			return ""
		}
		
		/**
		 * ```tree
		 * spread? \
		 * ```
		 */
		@ $mol_mem
		spread(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * spreads *
		 * ```
		 */
		spreads() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Spread $mol_view
		 * ```
		 */
		@ $mol_mem
		Spread() {
			const obj = new this.$.$mol_view()
			
			return obj
		}
		
		/**
		 * ```tree
		 * pages / <= Menu
		 * ```
		 */
		pages() {
			return [
				this.Menu()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Spread_close $mol_link
		 * 	arg <= spread_close_arg
		 * 	sub / <= Spread_close_icon
		 * ```
		 */
		@ $mol_mem
		Spread_close() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => this.spread_close_arg()
			obj.sub = () => [
				this.Spread_close_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Menu_logo null
		 * ```
		 */
		Menu_logo() {
			return null as any
		}
		
		/**
		 * ```tree
		 * menu_title \
		 * ```
		 */
		menu_title() {
			return ""
		}
		
		/**
		 * ```tree
		 * menu_tools /
		 * ```
		 */
		menu_tools() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * menu_head /
		 * 	<= Menu_title
		 * 	<= Menu_tools
		 * ```
		 */
		menu_head() {
			return [
				this.Menu_title(),
				this.Menu_tools()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * menu_filter? \
		 * ```
		 */
		@ $mol_mem
		menu_filter(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Menu_filter $mol_search query? <=> menu_filter?
		 * ```
		 */
		@ $mol_mem
		Menu_filter() {
			const obj = new this.$.$mol_search()
			
			obj.query = (next?: any) => this.menu_filter(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * arg* *
		 * ```
		 */
		arg(id: any) {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * spread_title* \
		 * ```
		 */
		spread_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Menu_link_title* $mol_dimmer
		 * 	needle <= menu_filter
		 * 	haystack <= spread_title*
		 * ```
		 */
		@ $mol_mem_key
		Menu_link_title(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.needle = () => this.menu_filter()
			obj.haystack = () => this.spread_title(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_link_content* / <= Menu_link_title*
		 * ```
		 */
		menu_link_content(id: any) {
			return [
				this.Menu_link_title(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Menu_link*0 $mol_link
		 * 	arg <= arg*
		 * 	sub <= menu_link_content*
		 * ```
		 */
		@ $mol_mem_key
		Menu_link(id: any) {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => this.arg(id)
			obj.sub = () => this.menu_link_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_links / <= Menu_link*0
		 * ```
		 */
		menu_links() {
			return [
				this.Menu_link("0")
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Menu_links $mol_list rows <= menu_links
		 * ```
		 */
		@ $mol_mem
		Menu_links() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.menu_links()
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_body /
		 * 	<= Menu_filter
		 * 	<= Menu_links
		 * ```
		 */
		menu_body() {
			return [
				this.Menu_filter(),
				this.Menu_links()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * menu_foot /
		 * ```
		 */
		menu_foot() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Menu_title
		 * ```
		 */
		Menu_title() {
			return this.Menu().Title()
		}
		
		/**
		 * ```tree
		 * Menu_tools
		 * ```
		 */
		Menu_tools() {
			return this.Menu().Tools()
		}
		
		/**
		 * ```tree
		 * Menu $mol_page
		 * 	Logo <= Menu_logo
		 * 	Title => Menu_title
		 * 	title <= menu_title
		 * 	Tools => Menu_tools
		 * 	tools <= menu_tools
		 * 	head <= menu_head
		 * 	body <= menu_body
		 * 	foot <= menu_foot
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_page()
			
			obj.Logo = () => this.Menu_logo()
			obj.title = () => this.menu_title()
			obj.tools = () => this.menu_tools()
			obj.head = () => this.menu_head()
			obj.body = () => this.menu_body()
			obj.foot = () => this.menu_foot()
			
			return obj
		}
		
		/**
		 * ```tree
		 * spread_close_arg *
		 * ```
		 */
		spread_close_arg() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Spread_close_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Spread_close_icon() {
			const obj = new this.$.$mol_icon_cross()
			
			return obj
		}
	}
	
}

