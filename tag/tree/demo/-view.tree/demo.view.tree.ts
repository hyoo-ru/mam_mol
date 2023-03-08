namespace $ {
	export class $mol_tag_tree_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \Autoatic tag tree
		 * ```
		 */
		title() {
			return "Autoatic tag tree"
		}
		
		/**
		 * ```tree
		 * sub / <= Tree
		 * ```
		 */
		sub() {
			return [
				this.Tree()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\tags
		 * 	\tree
		 * 	\taxonomy
		 * 	\menu
		 * ```
		 */
		tags() {
			return [
				"tags",
				"tree",
				"taxonomy",
				"menu"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * item_ids /string
		 * ```
		 */
		item_ids() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * item_tags* /string
		 * ```
		 */
		item_tags(id: any) {
			return [
			] as readonly string[]
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
		 * Item* $mol_button_minor title <= item_title*
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.item_title(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Tree $mol_tag_tree
		 * 	ids <= item_ids
		 * 	tags* <= item_tags*
		 * 	Item* <= Item*
		 * ```
		 */
		@ $mol_mem
		Tree() {
			const obj = new this.$.$mol_tag_tree()
			
			obj.ids = () => this.item_ids()
			obj.tags = (id: any) => this.item_tags(id)
			obj.Item = (id: any) => this.Item(id)
			
			return obj
		}
	}
	
}

