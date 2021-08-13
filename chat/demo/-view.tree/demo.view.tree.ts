namespace $ {
	export class $mol_chat_demo extends $mol_demo_large {
		
		/**
		 * ```tree
		 * title @ \Feed of comments for this page
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_chat_demo_title' )
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Row
		 * 	<= Pages
		 * ```
		 */
		sub() {
			return [
				this.Row(),
				this.Pages()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * chat_pages
		 * ```
		 */
		chat_pages() {
			return this.Chat().pages()
		}
		
		/**
		 * ```tree
		 * Chat $mol_chat
		 * 	seed \mol_chat_demo
		 * 	pages => chat_pages
		 * ```
		 */
		@ $mol_mem
		Chat() {
			const obj = new this.$.$mol_chat()
			
			obj.seed = () => "mol_chat_demo"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Row $mol_row sub / <= Chat
		 * ```
		 */
		@ $mol_mem
		Row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Chat()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pages $mol_view sub <= chat_pages
		 * ```
		 */
		@ $mol_mem
		Pages() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => this.chat_pages()
			
			return obj
		}
	}
	
}

