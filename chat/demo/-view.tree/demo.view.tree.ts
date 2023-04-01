namespace $ {
	export class $mol_chat_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Feed of comments for this page
		 * ```
		 */
		title() {
			return "Feed of comments for this page"
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
		 * tags /
		 * 	\chat
		 * 	\communication
		 * ```
		 */
		tags() {
			return [
				"chat",
				"communication"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
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

