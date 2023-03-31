namespace $ {
	export class $mol_tag_tree extends $mol_list {
		
		/**
		 * ```tree
		 * sieve $mol_tag_sieve
		 * 	ids_tags <= ids_tags
		 * 	separator <= separator
		 * ```
		 */
		@ $mol_mem
		sieve() {
			const obj = new this.$.$mol_tag_sieve()
			
			obj.ids_tags = () => this.ids_tags()
			obj.separator = () => this.separator()
			
			return obj
		}
		
		/**
		 * ```tree
		 * levels_expanded 0
		 * ```
		 */
		levels_expanded() {
			return 0
		}
		
		/**
		 * ```tree
		 * sort_items null
		 * ```
		 */
		sort_items() {
			return null as any
		}
		
		/**
		 * ```tree
		 * sort_tags null
		 * ```
		 */
		sort_tags() {
			return null as any
		}
		
		/**
		 * ```tree
		 * sub /$mol_view
		 * 	^ tag_list /$mol_view
		 * 	^ item_list /$mol_view
		 * ```
		 */
		sub() {
			return [
				...this.tag_list(),
				...this.item_list()
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * tag_name* \
		 * ```
		 */
		tag_name(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * tag_names *
		 * ```
		 */
		tag_names() {
			return {
			}
		}
		
		/**
		 * ```tree
		 * tag_list /$mol_view
		 * ```
		 */
		tag_list() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * item_list /$mol_view
		 * ```
		 */
		item_list() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Item* $mol_view sub / <= item_title*
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.item_title(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Tag* $mol_expander
		 * 	expandable true
		 * 	expanded? <=> tag_expanded*?
		 * 	title <= tag_name*
		 * 	content / <= Tag_tree*
		 * ```
		 */
		@ $mol_mem_key
		Tag(id: any) {
			const obj = new this.$.$mol_expander()
			
			obj.expandable = () => true
			obj.expanded = (next?: any) => this.tag_expanded(id, next)
			obj.title = () => this.tag_name(id)
			obj.content = () => [
				this.Tag_tree(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * ids_tags *
		 * ```
		 */
		ids_tags() {
			return {
			}
		}
		
		/**
		 * ```tree
		 * separator \/
		 * ```
		 */
		separator() {
			return "/"
		}
		
		/**
		 * ```tree
		 * item_title* \
		 * ```
		 */
		item_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * tag_expanded*? false
		 * ```
		 */
		@ $mol_mem_key
		tag_expanded(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * sieve_sub* $mol_tag_sieve
		 * ```
		 */
		@ $mol_mem_key
		sieve_sub(id: any) {
			const obj = new this.$.$mol_tag_sieve()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Tag_tree* $mol_tag_tree
		 * 	sieve <= sieve_sub*
		 * 	Item* <= Item*
		 * 	item_title* <= item_title*
		 * 	tag_expanded*? <=> tag_expanded*?
		 * 	tag_name* <= tag_name*
		 * ```
		 */
		@ $mol_mem_key
		Tag_tree(id: any) {
			const obj = new this.$.$mol_tag_tree()
			
			obj.sieve = () => this.sieve_sub(id)
			obj.Item = (id: any) => this.Item(id)
			obj.item_title = (id: any) => this.item_title(id)
			obj.tag_expanded = (id: any, next?: any) => this.tag_expanded(id, next)
			obj.tag_name = (id: any) => this.tag_name(id)
			
			return obj
		}
	}
	
}

