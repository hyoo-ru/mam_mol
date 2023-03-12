namespace $ {
	export class $mol_tag_tree extends $mol_list {
		
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
		 * tree *
		 * ```
		 */
		tree() {
			return {
			}
		}
		
		/**
		 * ```tree
		 * tree_path /string
		 * ```
		 */
		tree_path() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * path_sep \/
		 * ```
		 */
		path_sep() {
			return "/"
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
		 * tag_name* \
		 * ```
		 */
		tag_name(id: any) {
			return ""
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
		 * sort_tags null
		 * ```
		 */
		sort_tags() {
			return null as any
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
		 * Tags /$mol_view
		 * ```
		 */
		Tags() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Items /$mol_view
		 * ```
		 */
		Items() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * sub /$mol_view
		 * 	^ Tags /$mol_view
		 * 	^ Items /$mol_view
		 * ```
		 */
		sub() {
			return [
				...this.Tags(),
				...this.Items()
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Tag* $mol_expander
		 * 	title <= tag_name*
		 * 	expanded? <=> tag_expanded*?
		 * 	content / <= Tag_tree*
		 * ```
		 */
		@ $mol_mem_key
		Tag(id: any) {
			const obj = new this.$.$mol_expander()
			
			obj.title = () => this.tag_name(id)
			obj.expanded = (next?: any) => this.tag_expanded(id, next)
			obj.content = () => [
				this.Tag_tree(id)
			] as readonly any[]
			
			return obj
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
		 * tree_path_id* /string
		 * ```
		 */
		tree_path_id(id: any) {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * Tag_tree* $mol_tag_tree
		 * 	tree_path <= tree_path_id*
		 * 	tree <= tree
		 * 	Item* <= Item*
		 * 	tag_name* <= tag_name*
		 * 	item_title* <= item_title*
		 * 	tag_expanded*? <=> tag_expanded*?
		 * ```
		 */
		@ $mol_mem_key
		Tag_tree(id: any) {
			const obj = new this.$.$mol_tag_tree()
			
			obj.tree_path = () => this.tree_path_id(id)
			obj.tree = () => this.tree()
			obj.Item = (id: any) => this.Item(id)
			obj.tag_name = (id: any) => this.tag_name(id)
			obj.item_title = (id: any) => this.item_title(id)
			obj.tag_expanded = (id: any, next?: any) => this.tag_expanded(id, next)
			
			return obj
		}
	}
	
}

