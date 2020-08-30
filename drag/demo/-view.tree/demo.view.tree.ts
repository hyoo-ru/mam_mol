namespace $ {
	export class $mol_drag_demo extends $mol_demo_large {

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
		 * sub / <= List_drop $mol_drop
		 * 	adopt?transfer <=> transfer_adopt?transfer null
		 * 	receive?obj <=> receive?obj null
		 * 	Sub <= Scroll $mol_scroll sub /
		 * 		<= Trash_drop $mol_drop
		 * 			adopt?transfer <=> transfer_adopt?transfer null
		 * 			receive?obj <=> receive_trash?obj null
		 * 			Sub <= Trash $mol_float sub /
		 * 				<= Trash_icon $mol_icon_trash_can_outline
		 * 				\Trash
		 * 		<= List $mol_list rows <= task_rows /
		 * ```
		 */
		sub() {
			return [
				this.List_drop()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * List_drop $mol_drop
		 * 	adopt?transfer <=> transfer_adopt?transfer null
		 * 	receive?obj <=> receive?obj null
		 * 	Sub <= Scroll $mol_scroll sub /
		 * 		<= Trash_drop $mol_drop
		 * 			adopt?transfer <=> transfer_adopt?transfer null
		 * 			receive?obj <=> receive_trash?obj null
		 * 			Sub <= Trash $mol_float sub /
		 * 				<= Trash_icon $mol_icon_trash_can_outline
		 * 				\Trash
		 * 		<= List $mol_list rows <= task_rows /
		 * ```
		 */
		@ $mol_mem
		List_drop() {
			const obj = new this.$.$mol_drop()

			obj.adopt = (transfer?: any) => this.transfer_adopt(transfer)
			obj.receive = (obj?: any) => this.receive(obj)
			obj.Sub = () => this.Scroll()

			return obj
		}

		/**
		 * ```tree
		 * transfer_adopt?transfer null
		 * ```
		 */
		@ $mol_mem
		transfer_adopt(transfer?: any) {
			if ( transfer !== undefined ) return transfer
			return null as any
		}

		/**
		 * ```tree
		 * receive?obj null
		 * ```
		 */
		@ $mol_mem
		receive(obj?: any) {
			if ( obj !== undefined ) return obj
			return null as any
		}

		/**
		 * ```tree
		 * Scroll $mol_scroll sub /
		 * 	<= Trash_drop $mol_drop
		 * 		adopt?transfer <=> transfer_adopt?transfer null
		 * 		receive?obj <=> receive_trash?obj null
		 * 		Sub <= Trash $mol_float sub /
		 * 			<= Trash_icon $mol_icon_trash_can_outline
		 * 			\Trash
		 * 	<= List $mol_list rows <= task_rows /
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Trash_drop(),
				this.List()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Trash_drop $mol_drop
		 * 	adopt?transfer <=> transfer_adopt?transfer null
		 * 	receive?obj <=> receive_trash?obj null
		 * 	Sub <= Trash $mol_float sub /
		 * 		<= Trash_icon $mol_icon_trash_can_outline
		 * 		\Trash
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
		 * receive_trash?obj null
		 * ```
		 */
		@ $mol_mem
		receive_trash(obj?: any) {
			if ( obj !== undefined ) return obj
			return null as any
		}

		/**
		 * ```tree
		 * Trash $mol_float sub /
		 * 	<= Trash_icon $mol_icon_trash_can_outline
		 * 	\Trash
		 * ```
		 */
		@ $mol_mem
		Trash() {
			const obj = new this.$.$mol_float()

			obj.sub = () => [
				this.Trash_icon(),
				"Trash"
			] as readonly any[]

			return obj
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
		 * List $mol_list rows <= task_rows /
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
		 * task_rows /
		 * ```
		 */
		task_rows() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Task_row!task $mol_drag
		 * 	transfer *
		 * 		text/plain <= task_title!task \
		 * 		text/html <= task_html!task \
		 * 		text/uri-list <= task_uri!task \
		 * 	Sub <= Task_drop!task $mol_drop
		 * 		adopt?transfer <=> transfer_adopt?transfer null
		 * 		receive?obj <=> receive_before!task?obj null
		 * 		Sub <= Task_link!task $mol_link
		 * 			uri <= task_uri!task \
		 * 			sub / <= task_title!task \
		 * ```
		 */
		@ $mol_mem_key
		Task_row(task: any) {
			const obj = new this.$.$mol_drag()

			obj.transfer = () => ({
				"text/plain": this.task_title(task),
				"text/html": this.task_html(task),
				"text/uri-list": this.task_uri(task)
			})
			obj.Sub = () => this.Task_drop(task)

			return obj
		}

		/**
		 * ```tree
		 * task_title!task \
		 * ```
		 */
		task_title(task: any) {
			return ""
		}

		/**
		 * ```tree
		 * task_html!task \
		 * ```
		 */
		task_html(task: any) {
			return ""
		}

		/**
		 * ```tree
		 * task_uri!task \
		 * ```
		 */
		task_uri(task: any) {
			return ""
		}

		/**
		 * ```tree
		 * Task_drop!task $mol_drop
		 * 	adopt?transfer <=> transfer_adopt?transfer null
		 * 	receive?obj <=> receive_before!task?obj null
		 * 	Sub <= Task_link!task $mol_link
		 * 		uri <= task_uri!task \
		 * 		sub / <= task_title!task \
		 * ```
		 */
		@ $mol_mem_key
		Task_drop(task: any) {
			const obj = new this.$.$mol_drop()

			obj.adopt = (transfer?: any) => this.transfer_adopt(transfer)
			obj.receive = (obj?: any) => this.receive_before(task, obj)
			obj.Sub = () => this.Task_link(task)

			return obj
		}

		/**
		 * ```tree
		 * receive_before!task?obj null
		 * ```
		 */
		@ $mol_mem_key
		receive_before(task: any, obj?: any) {
			if ( obj !== undefined ) return obj
			return null as any
		}

		/**
		 * ```tree
		 * Task_link!task $mol_link
		 * 	uri <= task_uri!task \
		 * 	sub / <= task_title!task \
		 * ```
		 */
		@ $mol_mem_key
		Task_link(task: any) {
			const obj = new this.$.$mol_link()

			obj.uri = () => this.task_uri(task)
			obj.sub = () => [
				this.task_title(task)
			] as readonly any[]

			return obj
		}
	}

}
