namespace $ {
	export class $mol_app_demo_menu extends $mol_page {
		
		/**
		 * ```tree
		 * names /string
		 * ```
		 */
		names() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * widget_tags* /string
		 * ```
		 */
		widget_tags(id: any) {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * widget_aspects* /string
		 * ```
		 */
		widget_aspects(id: any) {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * widget_title* \
		 * ```
		 */
		widget_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * search_start? null
		 * ```
		 */
		@ $mol_mem
		search_start(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * body /
		 * 	<= Filter
		 * 	<= Tree
		 * ```
		 */
		body() {
			return [
				this.Filter(),
				this.Tree()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Option* $mol_link
		 * 	arg <= option_arg*
		 * 	sub / <= Option_title*
		 * ```
		 */
		@ $mol_mem_key
		Option(id: any) {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => this.option_arg(id)
			obj.sub = () => [
				this.Option_title(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * filter? \
		 * ```
		 */
		@ $mol_mem
		filter(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Filter $mol_search query? <=> filter?
		 * ```
		 */
		@ $mol_mem
		Filter() {
			const obj = new this.$.$mol_search()
			
			obj.query = (next?: any) => this.filter(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * ids_tags *
		 * ```
		 */
		ids_tags() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * levels_expanded_default 0
		 * ```
		 */
		levels_expanded_default() {
			return 0
		}
		
		/**
		 * ```tree
		 * levels_expanded <= levels_expanded_default
		 * ```
		 */
		levels_expanded() {
			return this.levels_expanded_default()
		}
		
		/**
		 * ```tree
		 * Tree $mol_tag_tree
		 * 	Item* <= Option*
		 * 	ids_tags <= ids_tags
		 * 	levels_expanded <= levels_expanded
		 * ```
		 */
		@ $mol_mem
		Tree() {
			const obj = new this.$.$mol_tag_tree()
			
			obj.Item = (id: any) => this.Option(id)
			obj.ids_tags = () => this.ids_tags()
			obj.levels_expanded = () => this.levels_expanded()
			
			return obj
		}
		
		/**
		 * ```tree
		 * option_arg* *
		 * ```
		 */
		option_arg(id: any) {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * option_title* \
		 * ```
		 */
		option_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Option_title* $mol_dimmer
		 * 	haystack <= option_title*
		 * 	needle <= filter?
		 * ```
		 */
		@ $mol_mem_key
		Option_title(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => this.option_title(id)
			obj.needle = () => this.filter()
			
			return obj
		}
	}
	
}

