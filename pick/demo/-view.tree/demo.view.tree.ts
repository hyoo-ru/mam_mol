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
		 * confirmation_popup_content * delete <= Delete_confirm_content
		 * ```
		 */
		confirmation_popup_content() {
			return {
				delete: this.Delete_confirm_content()
			}
		}
		
		/**
		 * ```tree
		 * showed_confirmation null
		 * ```
		 */
		showed_confirmation() {
			return null as any
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Demo_caption
		 * 	<= Simple_pop
		 * 	<= Info_pop
		 * 	<= Options_pop
		 * ```
		 */
		sub() {
			return [
				this.Demo_caption(),
				this.Simple_pop(),
				this.Info_pop(),
				this.Options_pop()
			] as readonly any[]
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
		 * Delete_confirm_content $mol_list rows /
		 * 	<= Delete_message
		 * 	<= Delete_buttons
		 * ```
		 */
		@ $mol_mem
		Delete_confirm_content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Delete_message(),
				this.Delete_buttons()
			] as readonly any[]
			
			return obj
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
		 * Demo_caption $mol_view sub / <= title
		 * ```
		 */
		@ $mol_mem
		Demo_caption() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * pick_trigger \?
		 * ```
		 */
		pick_trigger() {
			return "?"
		}
		
		/**
		 * ```tree
		 * pick_content \This is popup content
		 * ```
		 */
		pick_content() {
			return "This is popup content"
		}
		
		/**
		 * ```tree
		 * Simple_pop $mol_pick
		 * 	hint \Click to show simple popup
		 * 	trigger_content / <= pick_trigger
		 * 	bubble_content / <= pick_content
		 * ```
		 */
		@ $mol_mem
		Simple_pop() {
			const obj = new this.$.$mol_pick()
			
			obj.hint = () => "Click to show simple popup"
			obj.trigger_content = () => [
				this.pick_trigger()
			] as readonly any[]
			obj.bubble_content = () => [
				this.pick_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * info_trigger $mol_icon_help_circle_outline
		 * ```
		 */
		@ $mol_mem
		info_trigger() {
			const obj = new this.$.$mol_icon_help_circle_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * info_content_text \
		 * 	\## Info Pop-up
		 * 	\**This is Markdown text content**
		 * 	\More complex info Pop-up example
		 * ```
		 */
		info_content_text() {
			return "## Info Pop-up\n**This is Markdown text content**\nMore complex info Pop-up example"
		}
		
		/**
		 * ```tree
		 * info_content $mol_text
		 * 	minimal_width 200
		 * 	text <= info_content_text
		 * ```
		 */
		@ $mol_mem
		info_content() {
			const obj = new this.$.$mol_text()
			
			obj.minimal_width = () => 200
			obj.text = () => this.info_content_text()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Info_pop $mol_pick
		 * 	hint \Click to show info popup
		 * 	trigger_content / <= info_trigger
		 * 	bubble_content / <= info_content
		 * ```
		 */
		@ $mol_mem
		Info_pop() {
			const obj = new this.$.$mol_pick()
			
			obj.hint = () => "Click to show info popup"
			obj.trigger_content = () => [
				this.info_trigger()
			] as readonly any[]
			obj.bubble_content = () => [
				this.info_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * options_trigger $mol_icon_dots_vertical
		 * ```
		 */
		@ $mol_mem
		options_trigger() {
			const obj = new this.$.$mol_icon_dots_vertical()
			
			return obj
		}
		
		/**
		 * ```tree
		 * options_trigger_content / <= options_trigger
		 * ```
		 */
		options_trigger_content() {
			return [
				this.options_trigger()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * options_bubble_content / <= Options_content
		 * ```
		 */
		options_bubble_content() {
			return [
				this.Options_content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Options_pop $mol_pick
		 * 	hint \Click to show options menu
		 * 	trigger_content <= options_trigger_content
		 * 	bubble_content <= options_bubble_content
		 * ```
		 */
		@ $mol_mem
		Options_pop() {
			const obj = new this.$.$mol_pick()
			
			obj.hint = () => "Click to show options menu"
			obj.trigger_content = () => this.options_trigger_content()
			obj.bubble_content = () => this.options_bubble_content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_item_copy_click?val null
		 * ```
		 */
		@ $mol_mem
		menu_item_copy_click(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * menu_item_copy_icon $mol_icon_content_copy
		 * ```
		 */
		@ $mol_mem
		menu_item_copy_icon() {
			const obj = new this.$.$mol_icon_content_copy()
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_item_copy_label \Copy
		 * ```
		 */
		menu_item_copy_label() {
			return "Copy"
		}
		
		/**
		 * ```tree
		 * Menu_item_copy $mol_button_minor
		 * 	event_click?val <=> menu_item_copy_click?val
		 * 	sub /
		 * 		<= menu_item_copy_icon
		 * 		<= menu_item_copy_label
		 * ```
		 */
		@ $mol_mem
		Menu_item_copy() {
			const obj = new this.$.$mol_button_minor()
			
			obj.event_click = (val?: any) => this.menu_item_copy_click(val)
			obj.sub = () => [
				this.menu_item_copy_icon(),
				this.menu_item_copy_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_item_download_label \Download
		 * ```
		 */
		menu_item_download_label() {
			return "Download"
		}
		
		/**
		 * ```tree
		 * menu_item_download_hint \Download some json
		 * ```
		 */
		menu_item_download_hint() {
			return "Download some json"
		}
		
		/**
		 * ```tree
		 * menu_item_download_blob $mol_blob
		 * ```
		 */
		@ $mol_mem
		menu_item_download_blob() {
			const obj = new this.$.$mol_blob()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Menu_item_download $mol_button_download
		 * 	title <= menu_item_download_label
		 * 	hint <= menu_item_download_hint
		 * 	blob <= menu_item_download_blob
		 * 	file_name \demo.json
		 * ```
		 */
		@ $mol_mem
		Menu_item_download() {
			const obj = new this.$.$mol_button_download()
			
			obj.title = () => this.menu_item_download_label()
			obj.hint = () => this.menu_item_download_hint()
			obj.blob = () => this.menu_item_download_blob()
			obj.file_name = () => "demo.json"
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_item_delete_click?val null
		 * ```
		 */
		@ $mol_mem
		menu_item_delete_click(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
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
		 * Menu_item_delete $mol_button_minor
		 * 	style * color \red
		 * 	event_click?val <=> menu_item_delete_click?val
		 * 	sub /
		 * 		<= menu_item_delete_icon
		 * 		<= menu_item_delete_label
		 * ```
		 */
		@ $mol_mem
		Menu_item_delete() {
			const obj = new this.$.$mol_button_minor()
			
			obj.style = () => ({
				color: "red"
			})
			obj.event_click = (val?: any) => this.menu_item_delete_click(val)
			obj.sub = () => [
				this.menu_item_delete_icon(),
				this.menu_item_delete_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * delete_message \Something will be deleted. This can't be undone.
		 * ```
		 */
		delete_message() {
			return "Something will be deleted. This can't be undone."
		}
		
		/**
		 * ```tree
		 * Delete_message_text $mol_view sub / <= delete_message
		 * ```
		 */
		@ $mol_mem
		Delete_message_text() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.delete_message()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Delete_message $mol_row sub / <= Delete_message_text
		 * ```
		 */
		@ $mol_mem
		Delete_message() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Delete_message_text()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * delete_confirm_title \Delete
		 * ```
		 */
		delete_confirm_title() {
			return "Delete"
		}
		
		/**
		 * ```tree
		 * delete_confirm_click?val null
		 * ```
		 */
		@ $mol_mem
		delete_confirm_click(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Delete_confirm $mol_button_major
		 * 	title <= delete_confirm_title
		 * 	event_click?val <=> delete_confirm_click?val
		 * ```
		 */
		@ $mol_mem
		Delete_confirm() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => this.delete_confirm_title()
			obj.event_click = (val?: any) => this.delete_confirm_click(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * delete_cancel_title \Cancel
		 * ```
		 */
		delete_cancel_title() {
			return "Cancel"
		}
		
		/**
		 * ```tree
		 * delete_cancel_click?val null
		 * ```
		 */
		@ $mol_mem
		delete_cancel_click(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Delete_cancel $mol_button_minor
		 * 	title <= delete_cancel_title
		 * 	event_click?val <=> delete_cancel_click?val
		 * ```
		 */
		@ $mol_mem
		Delete_cancel() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.delete_cancel_title()
			obj.event_click = (val?: any) => this.delete_cancel_click(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Delete_buttons $mol_row sub /
		 * 	<= Delete_confirm
		 * 	<= Delete_cancel
		 * ```
		 */
		@ $mol_mem
		Delete_buttons() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Delete_confirm(),
				this.Delete_cancel()
			] as readonly any[]
			
			return obj
		}
	}
	
}

