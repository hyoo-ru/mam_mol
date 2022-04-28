namespace $ {
	export class $mol_attach extends $mol_view {
		
		/**
		 * ```tree
		 * items?val /string
		 * ```
		 */
		@ $mol_mem
		items(val?: any) {
			if ( val !== undefined ) return val as never
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * sub / <= Content
		 * ```
		 */
		sub() {
			return [
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Add $mol_button_open
		 * 	title <= attach_title
		 * 	files?val <=> attach_new?val
		 * ```
		 */
		@ $mol_mem
		Add() {
			const obj = new this.$.$mol_button_open()
			
			obj.title = () => this.attach_title()
			obj.files = (val?: any) => this.attach_new(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Item!id $mol_button_minor
		 * 	click?event <=> item_drop!id?event
		 * 	sub / <= Image!id
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.click = (event?: any) => this.item_drop(id, event)
			obj.sub = () => [
				this.Image(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * content /$mol_view
		 * ```
		 */
		content() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Content $mol_row sub <= content
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => this.content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * attach_title \
		 * ```
		 */
		attach_title() {
			return ""
		}
		
		/**
		 * ```tree
		 * attach_new?val null
		 * ```
		 */
		@ $mol_mem
		attach_new(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * item_drop!id?event null
		 * ```
		 */
		@ $mol_mem_key
		item_drop(id: any, event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * item_uri!id \
		 * ```
		 */
		item_uri(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Image!id $mol_image
		 * 	title \
		 * 	uri <= item_uri!id
		 * ```
		 */
		@ $mol_mem_key
		Image(id: any) {
			const obj = new this.$.$mol_image()
			
			obj.title = () => ""
			obj.uri = () => this.item_uri(id)
			
			return obj
		}
	}
	
}

