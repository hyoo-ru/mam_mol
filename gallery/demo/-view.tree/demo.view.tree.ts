namespace $ {
	export class $mol_gallery_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \Gallery of cards
		 * ```
		 */
		title() {
			return "Gallery of cards"
		}
		
		/**
		 * ```tree
		 * count 101
		 * ```
		 */
		count() {
			return 101
		}
		
		/**
		 * ```tree
		 * sub / <= App
		 * ```
		 */
		sub() {
			return [
				this.App()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Item* $mol_stack sub / <= Item_image*
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_stack()
			
			obj.sub = () => [
				this.Item_image(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\gallery
		 * 	\image
		 * 	\adaptive
		 * 	\masonry
		 * ```
		 */
		tags() {
			return [
				"gallery",
				"image",
				"adaptive",
				"masonry"
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
		 * items /
		 * ```
		 */
		items() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * App $mol_gallery items <= items
		 * ```
		 */
		@ $mol_mem
		App() {
			const obj = new this.$.$mol_gallery()
			
			obj.items = () => this.items()
			
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
		 * Item_image* $mol_avatar id <= item_title*
		 * ```
		 */
		@ $mol_mem_key
		Item_image(id: any) {
			const obj = new this.$.$mol_avatar()
			
			obj.id = () => this.item_title(id)
			
			return obj
		}
	}
	
}

