namespace $ {
	export class $mol_row_demo_products extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Product catalog
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_row_demo_products_title' )
		}

		/**
		 * ```tree
		 * count 500
		 * ```
		 */
		count() {
			return 500
		}

		/**
		 * ```tree
		 * Product!id $mol_card
		 * 	minimal_width 140
		 * 	minimal_height 100
		 * 	content / <= product_title!id \
		 * ```
		 */
		@ $mol_mem_key
		Product(id: any) {
			const obj = new this.$.$mol_card()

			obj.minimal_width = () => 140
			obj.minimal_height = () => 100
			obj.content = () => [
				this.product_title(id)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * product_title!id \
		 * ```
		 */
		product_title(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * sub / <= Catalog $mol_scroll sub / <= Products $mol_row sub <= products /
		 * ```
		 */
		sub() {
			return [
				this.Catalog()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Catalog $mol_scroll sub / <= Products $mol_row sub <= products /
		 * ```
		 */
		@ $mol_mem
		Catalog() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Products()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Products $mol_row sub <= products /
		 * ```
		 */
		@ $mol_mem
		Products() {
			const obj = new this.$.$mol_row()

			obj.sub = () => this.products()

			return obj
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
	}

}
