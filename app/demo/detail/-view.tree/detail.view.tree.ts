namespace $ {
	export class $mol_app_demo_detail extends $mol_page {
		
		/**
		 * ```tree
		 * description \
		 * ```
		 */
		description() {
			return ""
		}
		
		/**
		 * ```tree
		 * tools /
		 * 	<= Readme
		 * 	<= Chat
		 * 	<= Edit
		 * 	<= Close
		 * ```
		 */
		tools() {
			return [
				this.Readme(),
				this.Chat(),
				this.Edit(),
				this.Close()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * body_content / <= Demo
		 * ```
		 */
		body_content() {
			return [
				this.Demo()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * readme? false
		 * ```
		 */
		@ $mol_mem
		readme(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * readme_icon $mol_icon_information_outline
		 * ```
		 */
		@ $mol_mem
		readme_icon() {
			const obj = new this.$.$mol_icon_information_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Readme $mol_check_icon
		 * 	checked? <=> readme?
		 * 	hint @ \Readme
		 * 	Icon <= readme_icon
		 * ```
		 */
		@ $mol_mem
		Readme() {
			const obj = new this.$.$mol_check_icon()
			
			obj.checked = (next?: any) => this.readme(next)
			obj.hint = () => this.$.$mol_locale.text( '$mol_app_demo_detail_Readme_hint' )
			obj.Icon = () => this.readme_icon()
			
			return obj
		}
		
		/**
		 * ```tree
		 * chat_seed \0_0
		 * ```
		 */
		chat_seed() {
			return "0_0"
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
		 * 	pages => chat_pages
		 * 	seed <= chat_seed
		 * ```
		 */
		@ $mol_mem
		Chat() {
			const obj = new this.$.$mol_chat()
			
			obj.seed = () => this.chat_seed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * edit_hint @ \Edit this demo in studio
		 * ```
		 */
		edit_hint() {
			return this.$.$mol_locale.text( '$mol_app_demo_detail_edit_hint' )
		}
		
		/**
		 * ```tree
		 * Edit_speck $mol_speck value \β
		 * ```
		 */
		@ $mol_mem
		Edit_speck() {
			const obj = new this.$.$mol_speck()
			
			obj.value = () => "β"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Edit_icon $mol_icon_settings
		 * ```
		 */
		@ $mol_mem
		Edit_icon() {
			const obj = new this.$.$mol_icon_settings()
			
			return obj
		}
		
		/**
		 * ```tree
		 * edit_uri \
		 * ```
		 */
		edit_uri() {
			return ""
		}
		
		/**
		 * ```tree
		 * Edit $mol_link
		 * 	hint <= edit_hint
		 * 	sub /
		 * 		<= Edit_speck
		 * 		<= Edit_icon
		 * 	uri <= edit_uri
		 * ```
		 */
		@ $mol_mem
		Edit() {
			const obj = new this.$.$mol_link()
			
			obj.hint = () => this.edit_hint()
			obj.sub = () => [
				this.Edit_speck(),
				this.Edit_icon()
			] as readonly any[]
			obj.uri = () => this.edit_uri()
			
			return obj
		}
		
		/**
		 * ```tree
		 * close_hint @ \Close panel
		 * ```
		 */
		close_hint() {
			return this.$.$mol_locale.text( '$mol_app_demo_detail_close_hint' )
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
		 * close_arg * demo null
		 * ```
		 */
		close_arg() {
			return {
				demo: null as any
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Close $mol_link
		 * 	hint <= close_hint
		 * 	sub / <= Close_icon
		 * 	arg <= close_arg
		 * ```
		 */
		@ $mol_mem
		Close() {
			const obj = new this.$.$mol_link()
			
			obj.hint = () => this.close_hint()
			obj.sub = () => [
				this.Close_icon()
			] as readonly any[]
			obj.arg = () => this.close_arg()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo $mol_view
		 * ```
		 */
		@ $mol_mem
		Demo() {
			const obj = new this.$.$mol_view()
			
			return obj
		}
	}
	
}

