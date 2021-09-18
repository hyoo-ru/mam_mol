namespace $ {
	export class $mol_gallery_demo extends $mol_demo_large {
		
		/**
		 * ```tree
		 * title @ \Gallery of cards
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_gallery_demo_title' )
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
		 * sub / <= Scroll
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Item!id $mol_link
		 * 	minimal_width 100
		 * 	uri \https://thiscatdoesnotexist.com/
		 * 	style * backgroundImage \url('https://thiscatdoesnotexist.com/')
		 * 	sub / <= Item_title!id
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_link()
			
			obj.minimal_width = () => 100
			obj.uri = () => "https://thiscatdoesnotexist.com/"
			obj.style = () => ({
				backgroundImage: "url('https://thiscatdoesnotexist.com/')"
			})
			obj.sub = () => [
				this.Item_title(id)
			] as readonly any[]
			
			return obj
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
		 * Scroll $mol_scroll sub / <= App
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()
			
			obj.sub = () => [
				this.App()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * item_title!id \
		 * ```
		 */
		item_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Item_title!id $mol_paragraph title <= item_title!id
		 * ```
		 */
		@ $mol_mem_key
		Item_title(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.title = () => this.item_title(id)
			
			return obj
		}
	}
	
}

