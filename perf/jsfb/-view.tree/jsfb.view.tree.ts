namespace $ {
	export class $mol_perf_jsfb extends $mol_scroll {
		
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
		 * title \$mol keyed
		 * ```
		 */
		title() {
			return "$mol keyed"
		}
		
		/**
		 * ```tree
		 * Title $mol_view sub / <= title
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * create_1K? null
		 * ```
		 */
		@ $mol_mem
		create_1K(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Create_1K $mol_button_major
		 * 	dom_id \run
		 * 	title \Create 1,000 rows
		 * 	click? <=> create_1K?
		 * ```
		 */
		@ $mol_mem
		Create_1K() {
			const obj = new this.$.$mol_button_major()
			
			obj.dom_id = () => "run"
			obj.title = () => "Create 1,000 rows"
			obj.click = (next?: any) => this.create_1K(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * create_10K? null
		 * ```
		 */
		@ $mol_mem
		create_10K(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Create_10K $mol_button_major
		 * 	dom_id \runlots
		 * 	title \Create 10,000 rows
		 * 	click? <=> create_10K?
		 * ```
		 */
		@ $mol_mem
		Create_10K() {
			const obj = new this.$.$mol_button_major()
			
			obj.dom_id = () => "runlots"
			obj.title = () => "Create 10,000 rows"
			obj.click = (next?: any) => this.create_10K(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * append_1K? null
		 * ```
		 */
		@ $mol_mem
		append_1K(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Append_1K $mol_button_major
		 * 	dom_id \add
		 * 	title \Append 1,000 rows
		 * 	click? <=> append_1K?
		 * ```
		 */
		@ $mol_mem
		Append_1K() {
			const obj = new this.$.$mol_button_major()
			
			obj.dom_id = () => "add"
			obj.title = () => "Append 1,000 rows"
			obj.click = (next?: any) => this.append_1K(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * update_10? null
		 * ```
		 */
		@ $mol_mem
		update_10(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Update_10 $mol_button_major
		 * 	dom_id \update
		 * 	title \Update every 10th row
		 * 	click? <=> update_10?
		 * ```
		 */
		@ $mol_mem
		Update_10() {
			const obj = new this.$.$mol_button_major()
			
			obj.dom_id = () => "update"
			obj.title = () => "Update every 10th row"
			obj.click = (next?: any) => this.update_10(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * clear? null
		 * ```
		 */
		@ $mol_mem
		clear(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Clear $mol_button_major
		 * 	dom_id \clear
		 * 	title \Clear
		 * 	click? <=> clear?
		 * ```
		 */
		@ $mol_mem
		Clear() {
			const obj = new this.$.$mol_button_major()
			
			obj.dom_id = () => "clear"
			obj.title = () => "Clear"
			obj.click = (next?: any) => this.clear(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * swap? null
		 * ```
		 */
		@ $mol_mem
		swap(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Swap $mol_button_major
		 * 	dom_id \swaprows
		 * 	title \Swap Rows
		 * 	click? <=> swap?
		 * ```
		 */
		@ $mol_mem
		Swap() {
			const obj = new this.$.$mol_button_major()
			
			obj.dom_id = () => "swaprows"
			obj.title = () => "Swap Rows"
			obj.click = (next?: any) => this.swap(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Controls $mol_row sub /
		 * 	<= Create_1K
		 * 	<= Create_10K
		 * 	<= Append_1K
		 * 	<= Update_10
		 * 	<= Clear
		 * 	<= Swap
		 * ```
		 */
		@ $mol_mem
		Controls() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Create_1K(),
				this.Create_10K(),
				this.Append_1K(),
				this.Update_10(),
				this.Clear(),
				this.Swap()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Head $mol_row sub /
		 * 	<= Title
		 * 	<= Controls
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Title(),
				this.Controls()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_selected*? false
		 * ```
		 */
		@ $mol_mem_key
		row_selected(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * row_drop*? null
		 * ```
		 */
		@ $mol_mem_key
		row_drop(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * row_id* \
		 * ```
		 */
		row_id(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * row_title*?
		 * ```
		 */
		row_title(id: any, next?: any) {
			return this.Row(id).title(next)
		}
		
		/**
		 * ```tree
		 * Row*0 $mol_perf_jsfb_row
		 * 	title? => row_title*?
		 * 	selected? <=> row_selected*?
		 * 	drop? <=> row_drop*?
		 * 	id <= row_id*
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_perf_jsfb_row()
			
			obj.selected = (next?: any) => this.row_selected(id, next)
			obj.drop = (next?: any) => this.row_drop(id, next)
			obj.id = () => this.row_id(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * rows / <= Row*0
		 * ```
		 */
		rows() {
			return [
				this.Row("0")
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Rows $mol_list rows <= rows
		 * ```
		 */
		@ $mol_mem
		Rows() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.rows()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows /
		 * 	<= Head
		 * 	<= Rows
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Head(),
				this.Rows()
			] as readonly any[]
			
			return obj
		}
	}
	
	export class $mol_perf_jsfb_row extends $mol_view {
		
		/**
		 * ```tree
		 * minimal_height 40
		 * ```
		 */
		minimal_height() {
			return 40
		}
		
		/**
		 * ```tree
		 * minimal_width 200
		 * ```
		 */
		minimal_width() {
			return 200
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_perf_jsfb_row_selected <= selected
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_perf_jsfb_row_selected: this.selected()
			}
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Id
		 * 	<= Title
		 * 	<= Drop
		 * ```
		 */
		sub() {
			return [
				this.Id(),
				this.Title(),
				this.Drop()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * id \
		 * ```
		 */
		id() {
			return ""
		}
		
		/**
		 * ```tree
		 * Id $mol_view sub / <= id
		 * ```
		 */
		@ $mol_mem
		Id() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.id()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * selected? false
		 * ```
		 */
		@ $mol_mem
		selected(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Title $mol_check
		 * 	checked? <=> selected?
		 * 	sub / <= title
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_check()
			
			obj.checked = (next?: any) => this.selected(next)
			obj.sub = () => [
				this.title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Drop_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Drop_icon() {
			const obj = new this.$.$mol_icon_cross()
			
			return obj
		}
		
		/**
		 * ```tree
		 * drop? null
		 * ```
		 */
		@ $mol_mem
		drop(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Drop $mol_button_minor
		 * 	sub / <= Drop_icon
		 * 	click? <=> drop?
		 * ```
		 */
		@ $mol_mem
		Drop() {
			const obj = new this.$.$mol_button_minor()
			
			obj.sub = () => [
				this.Drop_icon()
			] as readonly any[]
			obj.click = (next?: any) => this.drop(next)
			
			return obj
		}
	}
	
}

