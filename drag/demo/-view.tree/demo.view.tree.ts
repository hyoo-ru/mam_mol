namespace $ {
	export class $mol_drag_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * task_count 100
		 * ```
		 */
		task_count() {
			return 100
		}
		
		/**
		 * ```tree
		 * sub / <= List_drop
		 * ```
		 */
		sub() {
			return [
				this.List_drop()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Task_row* $mol_drag
		 * 	transfer *
		 * 		text/plain <= task_title*
		 * 		text/html <= task_html*
		 * 		text/uri-list <= task_uri*
		 * 	Sub <= Task_drop*
		 * ```
		 */
		@ $mol_mem_key
		Task_row(id: any) {
			const obj = new this.$.$mol_drag()
			
			obj.transfer = () => ({
				"text/plain": this.task_title(id),
				"text/html": this.task_html(id),
				"text/uri-list": this.task_uri(id)
			} as Record< string, any >)
			obj.Sub = () => this.Task_drop(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\drag
		 * 	\dragndrop
		 * 	\reorder
		 * 	\transfer
		 * ```
		 */
		tags() {
			return [
				"drag",
				"dragndrop",
				"reorder",
				"transfer"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Plugin
		 * 	\Drag'n'Drop
		 * ```
		 */
		aspects() {
			return [
				"Widget/Plugin",
				"Drag'n'Drop"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * transfer_adopt?transfer null
		 * ```
		 */
		@ $mol_mem
		transfer_adopt(transfer?: any) {
			if ( transfer !== undefined ) return transfer as never
			return null as any
		}
		
		/**
		 * ```tree
		 * receive?obj null
		 * ```
		 */
		@ $mol_mem
		receive(obj?: any) {
			if ( obj !== undefined ) return obj as never
			return null as any
		}
		
		/**
		 * ```tree
		 * receive_trash?obj null
		 * ```
		 */
		@ $mol_mem
		receive_trash(obj?: any) {
			if ( obj !== undefined ) return obj as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Trash_icon $mol_icon_trash_can_outline
		 * ```
		 */
		@ $mol_mem
		Trash_icon() {
			const obj = new this.$.$mol_icon_trash_can_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Trash $mol_view sub /
		 * 	<= Trash_icon
		 * 	\ Trash
		 * ```
		 */
		@ $mol_mem
		Trash() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Trash_icon(),
				" Trash"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Trash_drop $mol_drop
		 * 	adopt?transfer <=> transfer_adopt?transfer
		 * 	receive?obj <=> receive_trash?obj
		 * 	Sub <= Trash
		 * ```
		 */
		@ $mol_mem
		Trash_drop() {
			const obj = new this.$.$mol_drop()
			
			obj.adopt = (transfer?: any) => this.transfer_adopt(transfer)
			obj.receive = (obj?: any) => this.receive_trash(obj)
			obj.Sub = () => this.Trash()
			
			return obj
		}
		
		/**
		 * ```tree
		 * task_rows /
		 * ```
		 */
		task_rows() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * List $mol_list rows <= task_rows
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.task_rows()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Page $mol_page
		 * 	head / <= Trash_drop
		 * 	Body_content <= List
		 * ```
		 */
		@ $mol_mem
		Page() {
			const obj = new this.$.$mol_page()
			
			obj.head = () => [
				this.Trash_drop()
			] as readonly any[]
			obj.Body_content = () => this.List()
			
			return obj
		}
		
		/**
		 * ```tree
		 * List_drop $mol_drop
		 * 	adopt?transfer <=> transfer_adopt?transfer
		 * 	receive?obj <=> receive?obj
		 * 	Sub <= Page
		 * ```
		 */
		@ $mol_mem
		List_drop() {
			const obj = new this.$.$mol_drop()
			
			obj.adopt = (transfer?: any) => this.transfer_adopt(transfer)
			obj.receive = (obj?: any) => this.receive(obj)
			obj.Sub = () => this.Page()
			
			return obj
		}
		
		/**
		 * ```tree
		 * task_title* \
		 * ```
		 */
		task_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * task_html* \
		 * ```
		 */
		task_html(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * task_uri* \
		 * ```
		 */
		task_uri(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * receive_before*?obj null
		 * ```
		 */
		@ $mol_mem_key
		receive_before(id: any, obj?: any) {
			if ( obj !== undefined ) return obj as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Task_link* $mol_link
		 * 	uri <= task_uri*
		 * 	sub / <= task_title*
		 * ```
		 */
		@ $mol_mem_key
		Task_link(id: any) {
			const obj = new this.$.$mol_link()
			
			obj.uri = () => this.task_uri(id)
			obj.sub = () => [
				this.task_title(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Task_drop* $mol_drop
		 * 	adopt?transfer <=> transfer_adopt?transfer
		 * 	receive?obj <=> receive_before*?obj
		 * 	Sub <= Task_link*
		 * ```
		 */
		@ $mol_mem_key
		Task_drop(id: any) {
			const obj = new this.$.$mol_drop()
			
			obj.adopt = (transfer?: any) => this.transfer_adopt(transfer)
			obj.receive = (obj?: any) => this.receive_before(id, obj)
			obj.Sub = () => this.Task_link(id)
			
			return obj
		}
	}
	
}

