namespace $ {
	export class $mol_list_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Items_count_label
		 * 	<= Items
		 * ```
		 */
		sub() {
			return [
				this.Items_count_label(),
				this.Items()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\list
		 * 	\rows
		 * 	\stack
		 * ```
		 */
		tags() {
			return [
				"list",
				"rows",
				"stack"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Layout
		 * ```
		 */
		aspects() {
			return [
				"Widget/Layout"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * items_сount? 50
		 * ```
		 */
		@ $mol_mem
		items_сount(next?: any) {
			if ( next !== undefined ) return next as never
			return 50
		}
		
		/**
		 * ```tree
		 * Items_count $mol_number
		 * 	value? <=> items_сount?
		 * 	value_min 0
		 * 	value_max 100000
		 * ```
		 */
		@ $mol_mem
		Items_count() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.items_сount(next)
			obj.value_min = () => 0
			obj.value_max = () => 100000
			
			return obj
		}
		
		/**
		 * ```tree
		 * Items_count_label $mol_labeler
		 * 	title \Items count
		 * 	content / <= Items_count
		 * ```
		 */
		@ $mol_mem
		Items_count_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Items count"
			obj.content = () => [
				this.Items_count()
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
		 * Item*0 $mol_link title <= item_title*
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_link()
			
			obj.title = () => this.item_title(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * list_items / <= Item*0
		 * ```
		 */
		list_items() {
			return [
				this.Item("0")
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * List_empty $mol_paragraph title \No items in this list
		 * ```
		 */
		@ $mol_mem
		List_empty() {
			const obj = new this.$.$mol_paragraph()
			
			obj.title = () => "No items in this list"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Items $mol_list
		 * 	rows <= list_items
		 * 	Empty <= List_empty
		 * ```
		 */
		@ $mol_mem
		Items() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.list_items()
			obj.Empty = () => this.List_empty()
			
			return obj
		}
	}
	
}

