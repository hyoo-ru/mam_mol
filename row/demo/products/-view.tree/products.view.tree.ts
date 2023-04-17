namespace $ {
	export class $mol_row_demo_products extends $mol_example {
		
		/**
		 * ```tree
		 * title \Product catalog
		 * ```
		 */
		title() {
			return "Product catalog"
		}
		
		/**
		 * ```tree
		 * count 100
		 * ```
		 */
		count() {
			return 100
		}
		
		/**
		 * ```tree
		 * Product* $mol_card
		 * 	minimal_width 110
		 * 	minimal_height 100
		 * 	title <= product_title*
		 * ```
		 */
		@ $mol_mem_key
		Product(id: any) {
			const obj = new this.$.$mol_card()
			
			obj.minimal_width = () => 110
			obj.minimal_height = () => 100
			obj.title = () => this.product_title(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub / <= Products
		 * ```
		 */
		sub() {
			return [
				this.Products()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\products
		 * 	\grid
		 * 	\scroll
		 * ```
		 */
		tags() {
			return [
				"products",
				"grid",
				"scroll"
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
		 * product_title* \
		 * ```
		 */
		product_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * products /
		 * ```
		 */
		products() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Products $mol_row sub <= products
		 * ```
		 */
		@ $mol_mem
		Products() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => this.products()
			
			return obj
		}
	}
	
}

