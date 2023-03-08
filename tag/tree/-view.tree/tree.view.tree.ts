namespace $ {
	export class $mol_tag_tree extends $mol_list {
		
		/**
		 * ```tree
		 * tag_current? \
		 * ```
		 */
		@ $mol_mem
		tag_current(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
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
		 * ids /
		 * ```
		 */
		ids() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags* /
		 * ```
		 */
		tags(id: any) {
			return [
			] as readonly any[]
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
		 * sub / <= Tag*0
		 * ```
		 */
		sub() {
			return [
				this.Tag("0")
			] as readonly any[]
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
		 * tag_name* \
		 * ```
		 */
		tag_name(id: any) {
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
		 * tag_ids* /
		 * ```
		 */
		tag_ids(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Tag_tree* $mol_tag_tree
		 * 	ids <= tag_ids*
		 * 	tags* <= tags*
		 * 	Item* <= Item*
		 * ```
		 */
		@ $mol_mem_key
		Tag_tree(id: any) {
			const obj = new this.$.$mol_tag_tree()
			
			obj.ids = () => this.tag_ids(id)
			obj.tags = (id: any) => this.tags(id)
			obj.Item = (id: any) => this.Item(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Tag*0 $mol_expander
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
	}
	
}

