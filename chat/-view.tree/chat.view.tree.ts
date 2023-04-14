namespace $ {
	export class $mol_chat extends $mol_link {
		
		/**
		 * ```tree
		 * seed \
		 * ```
		 */
		seed() {
			return ""
		}
		
		/**
		 * ```tree
		 * opened false
		 * ```
		 */
		opened() {
			return false
		}
		
		/**
		 * ```tree
		 * arg * mol_chat \
		 * ```
		 */
		arg() {
			return {
				mol_chat: ""
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * hint <= title
		 * ```
		 */
		hint() {
			return this.title()
		}
		
		/**
		 * ```tree
		 * sub / <= Icon
		 * ```
		 */
		sub() {
			return [
				this.Icon()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * pages / <= Page
		 * ```
		 */
		pages() {
			return [
				this.Page()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Icon $mol_icon_forum_outline
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_forum_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * title @ \Discussion
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_chat_title' )
		}
		
		/**
		 * ```tree
		 * standalone \
		 * ```
		 */
		standalone() {
			return ""
		}
		
		/**
		 * ```tree
		 * Standalone_icon $mol_icon_open_in_new
		 * ```
		 */
		@ $mol_mem
		Standalone_icon() {
			const obj = new this.$.$mol_icon_open_in_new()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Esternal $mol_link
		 * 	uri <= standalone
		 * 	sub / <= Standalone_icon
		 * ```
		 */
		@ $mol_mem
		Esternal() {
			const obj = new this.$.$mol_link()
			
			obj.uri = () => this.standalone()
			obj.sub = () => [
				this.Standalone_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Close_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Close_icon() {
			const obj = new this.$.$mol_icon_cross()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Close $mol_link
		 * 	arg * mol_chat null
		 * 	sub / <= Close_icon
		 * ```
		 */
		@ $mol_mem
		Close() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => ({
				mol_chat: null as any
			} as Record< string, any >)
			obj.sub = () => [
				this.Close_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * embed \
		 * ```
		 */
		embed() {
			return ""
		}
		
		/**
		 * ```tree
		 * Embed $mol_frame uri <= embed
		 * ```
		 */
		@ $mol_mem
		Embed() {
			const obj = new this.$.$mol_frame()
			
			obj.uri = () => this.embed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Page $mol_page
		 * 	title <= title
		 * 	tools /
		 * 		<= Esternal
		 * 		<= Close
		 * 	Body <= Embed
		 * ```
		 */
		@ $mol_mem
		Page() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => this.title()
			obj.tools = () => [
				this.Esternal(),
				this.Close()
			] as readonly any[]
			obj.Body = () => this.Embed()
			
			return obj
		}
	}
	
}

