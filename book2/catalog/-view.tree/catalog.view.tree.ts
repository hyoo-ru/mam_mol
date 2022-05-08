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
		 * spread?val \
		 * ```
		 */
		@ $mol_mem
		spread(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * spreads *
		 * ```
		 */
		spreads() {
			return {
			}
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
		 * Link* $mol_link
		 * 	arg <= arg*
		 * 	sub / <= spread_title*
		 * ```
		 */
		@ $mol_mem_key
		Link(id: any) {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => this.arg(id)
			obj.sub = () => [
				this.spread_title(id)
			] as readonly any[]
			
			return obj
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
		 * menu_foot /
		 * ```
		 */
		menu_foot() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * links /
		 * ```
		 */
		links() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Links $mol_list rows <= links
		 * ```
		 */
		@ $mol_mem
		Links() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.links()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Menu $mol_page
		 * 	title <= menu_title
		 * 	tools <= menu_tools
		 * 	foot <= menu_foot
		 * 	body / <= Links
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => this.menu_title()
			obj.tools = () => this.menu_tools()
			obj.foot = () => this.menu_foot()
			obj.body = () => [
				this.Links()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * arg* *
		 * ```
		 */
		arg(id: any) {
			return {
			}
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
		 * spread_close_arg *
		 * ```
		 */
		spread_close_arg() {
			return {
			}
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

