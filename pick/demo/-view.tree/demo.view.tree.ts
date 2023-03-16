namespace $ {
	export class $mol_pick_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Simple and complex popups
		 * ```
		 */
		title() {
			return "Simple and complex popups"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Info_pop
		 * 	<= Options_pop
		 * ```
		 */
		sub() {
			return [
				this.Info_pop(),
				this.Options_pop()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_link_lazy
		 * 	\$mol_icon
		 * 	\$mol_text
		 * 	\$mol_check
		 * 	\pick
		 * 	\popup
		 * 	\info
		 * 	\menu
		 * 	\download
		 * 	\icon
		 * 	\container
		 * 	\confirm
		 * 	\markdown
		 * 	\modal
		 * ```
		 */
		tags() {
			return [
				"$mol_link_lazy",
				"$mol_icon",
				"$mol_text",
				"$mol_check",
				"pick",
				"popup",
				"info",
				"menu",
				"download",
				"icon",
				"container",
				"confirm",
				"markdown",
				"modal"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * info_content_text \
		 * 	\## Info Pop-up
		 * 	\**Markdown text content**
		 * ```
		 */
		info_content_text() {
			return "## Info Pop-up\n**Markdown text content**"
		}
		
		/**
		 * ```tree
		 * Info_content $mol_text text <= info_content_text
		 * ```
		 */
		@ $mol_mem
		Info_content() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.info_content_text()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Info_pop $mol_pick
		 * 	title \Info
		 * 	bubble_content / <= Info_content
		 * ```
		 */
		@ $mol_mem
		Info_pop() {
			const obj = new this.$.$mol_pick()
			
			obj.title = () => "Info"
			obj.bubble_content = () => [
				this.Info_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Options_trigger_icon $mol_icon_menu
		 * ```
		 */
		@ $mol_mem
		Options_trigger_icon() {
			const obj = new this.$.$mol_icon_menu()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Menu_item_copy $mol_button_copy
		 * 	title \Copy
		 * 	text \Hello, World!
		 * ```
		 */
		@ $mol_mem
		Menu_item_copy() {
			const obj = new this.$.$mol_button_copy()
			
			obj.title = () => "Copy"
			obj.text = () => "Hello, World!"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Menu_item_download_blob $mol_blob
		 * ```
		 */
		@ $mol_mem
		Menu_item_download_blob() {
			const obj = new this.$.$mol_blob()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Menu_item_download $mol_button_download
		 * 	title \Download
		 * 	blob <= Menu_item_download_blob
		 * 	file_name \demo.bin
		 * ```
		 */
		@ $mol_mem
		Menu_item_download() {
			const obj = new this.$.$mol_button_download()
			
			obj.title = () => "Download"
			obj.blob = () => this.Menu_item_download_blob()
			obj.file_name = () => "demo.bin"
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_item_delete_icon $mol_icon_trash_can_outline
		 * ```
		 */
		@ $mol_mem
		menu_item_delete_icon() {
			const obj = new this.$.$mol_icon_trash_can_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_item_delete_label \Delete
		 * ```
		 */
		menu_item_delete_label() {
			return "Delete"
		}
		
		/**
		 * ```tree
		 * delete_confirm? null
		 * ```
		 */
		@ $mol_mem
		delete_confirm(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Delete_confirm $mol_button_major
		 * 	title \Confirm
		 * 	click? <=> delete_confirm?
		 * ```
		 */
		@ $mol_mem
		Delete_confirm() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Confirm"
			obj.click = (next?: any) => this.delete_confirm(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Menu_item_delete $mol_pick
		 * 	align \center
		 * 	trigger_content /
		 * 		<= menu_item_delete_icon
		 * 		<= menu_item_delete_label
		 * 	bubble_content / <= Delete_confirm
		 * ```
		 */
		@ $mol_mem
		Menu_item_delete() {
			const obj = new this.$.$mol_pick()
			
			obj.align = () => "center"
			obj.trigger_content = () => [
				this.menu_item_delete_icon(),
				this.menu_item_delete_label()
			] as readonly any[]
			obj.bubble_content = () => [
				this.Delete_confirm()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Options_content $mol_list rows /
		 * 	<= Menu_item_copy
		 * 	<= Menu_item_download
		 * 	<= Menu_item_delete
		 * ```
		 */
		@ $mol_mem
		Options_content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Menu_item_copy(),
				this.Menu_item_download(),
				this.Menu_item_delete()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Options_pop $mol_pick
		 * 	hint \Click to show options menu
		 * 	trigger_content / <= Options_trigger_icon
		 * 	bubble_content / <= Options_content
		 * ```
		 */
		@ $mol_mem
		Options_pop() {
			const obj = new this.$.$mol_pick()
			
			obj.hint = () => "Click to show options menu"
			obj.trigger_content = () => [
				this.Options_trigger_icon()
			] as readonly any[]
			obj.bubble_content = () => [
				this.Options_content()
			] as readonly any[]
			
			return obj
		}
	}
	
}

