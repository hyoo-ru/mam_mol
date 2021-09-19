namespace $ {
	export class $mol_chat_demo extends $mol_demo_small {
		
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
		 * sub / <= Chat
		 * ```
		 */
		sub() {
			return [
				this.Chat()
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
	}
	
}

