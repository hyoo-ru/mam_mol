namespace $ {
	export class $mol_list_demo_table extends $mol_example {
		
		/**
		 * ```tree
		 * title \Large list of rows with dynamic content
		 * ```
		 */
		title() {
			return "Large list of rows with dynamic content"
		}
		
		/**
		 * ```tree
		 * count 9999
		 * ```
		 */
		count() {
			return 9999
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Head
		 * 	<= Rows
		 * ```
		 */
		sub() {
			return [
				this.Head(),
				this.Rows()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\list
		 * 	\table
		 * 	\scroll
		 * 	\divider
		 * 	\grid
		 * ```
		 */
		tags() {
			return [
				"list",
				"table",
				"scroll",
				"divider",
				"grid"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Layout
		 * ```
		 */
		aspects() {
			return [
				"Widget/Layout"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * check_list /$mol_check
		 * ```
		 */
		check_list() {
			return [
			] as readonly $mol_check[]
		}
		
		/**
		 * ```tree
		 * Check $mol_check_group
		 * 	checks <= check_list
		 * 	title \Good Goods
		 * ```
		 */
		@ $mol_mem
		Check() {
			const obj = new this.$.$mol_check_group()
			
			obj.checks = () => this.check_list()
			obj.title = () => "Good Goods"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Head $mol_row sub / <= Check
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Check()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_id*? \0000
		 * ```
		 */
		@ $mol_mem_key
		row_id(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return "0000"
		}
		
		/**
		 * ```tree
		 * row_checked*? false
		 * ```
		 */
		@ $mol_mem_key
		row_checked(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Id* $mol_check_box
		 * 	title <= row_id*?
		 * 	checked? <=> row_checked*?
		 * ```
		 */
		@ $mol_mem_key
		Id(id: any) {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.row_id(id)
			obj.checked = (next?: any) => this.row_checked(id, next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Id_labeler* $mol_labeler
		 * 	title \ID
		 * 	Content <= Id*
		 * ```
		 */
		@ $mol_mem_key
		Id_labeler(id: any) {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "ID"
			obj.Content = () => this.Id(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_uri* \
		 * ```
		 */
		row_uri(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * row_title* \
		 * ```
		 */
		row_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Title* $mol_link_iconed
		 * 	uri <= row_uri*
		 * 	title <= row_title*
		 * ```
		 */
		@ $mol_mem_key
		Title(id: any) {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.row_uri(id)
			obj.title = () => this.row_title(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Title_labeler* $mol_labeler
		 * 	title \Product Name
		 * 	Content <= Title*
		 * ```
		 */
		@ $mol_mem_key
		Title_labeler(id: any) {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Product Name"
			obj.Content = () => this.Title(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_color*? \
		 * ```
		 */
		@ $mol_mem_key
		row_color(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * colors /
		 * ```
		 */
		colors() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Color* $mol_select
		 * 	value? <=> row_color*?
		 * 	options <= colors
		 * ```
		 */
		@ $mol_mem_key
		Color(id: any) {
			const obj = new this.$.$mol_select()
			
			obj.value = (next?: any) => this.row_color(id, next)
			obj.options = () => this.colors()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Color_labeler* $mol_labeler
		 * 	title \Color
		 * 	Content <= Color*
		 * ```
		 */
		@ $mol_mem_key
		Color_labeler(id: any) {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Color"
			obj.Content = () => this.Color(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_status*? \
		 * ```
		 */
		@ $mol_mem_key
		row_status(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * status_options *
		 * 	minor \Store
		 * 	major \Sale
		 * 	critical \Support
		 * ```
		 */
		status_options() {
			return {
				minor: "Store",
				major: "Sale",
				critical: "Support"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Status* $mol_switch
		 * 	value? <=> row_status*?
		 * 	options <= status_options
		 * ```
		 */
		@ $mol_mem_key
		Status(id: any) {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.row_status(id, next)
			obj.options = () => this.status_options()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Status_labeler* $mol_labeler
		 * 	title \Status
		 * 	Content <= Status*
		 * ```
		 */
		@ $mol_mem_key
		Status_labeler(id: any) {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Status"
			obj.Content = () => this.Status(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_quantity*? 0
		 * ```
		 */
		@ $mol_mem_key
		row_quantity(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * Quantity* $mol_number value? <=> row_quantity*?
		 * ```
		 */
		@ $mol_mem_key
		Quantity(id: any) {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.row_quantity(id, next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Quantity_labeler* $mol_labeler
		 * 	title \Quantity
		 * 	Content <= Quantity*
		 * ```
		 */
		@ $mol_mem_key
		Quantity_labeler(id: any) {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Quantity"
			obj.Content = () => this.Quantity(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_moment*? $mol_time_moment
		 * ```
		 */
		@ $mol_mem_key
		row_moment(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Date* $mol_date value_moment? <=> row_moment*?
		 * ```
		 */
		@ $mol_mem_key
		Date(id: any) {
			const obj = new this.$.$mol_date()
			
			obj.value_moment = (next?: any) => this.row_moment(id, next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Date_labeler* $mol_labeler
		 * 	title \Supply Time
		 * 	Content <= Date*
		 * ```
		 */
		@ $mol_mem_key
		Date_labeler(id: any) {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Supply Time"
			obj.Content = () => this.Date(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_content* /
		 * 	<= Id_labeler*
		 * 	<= Title_labeler*
		 * 	<= Color_labeler*
		 * 	<= Status_labeler*
		 * 	<= Quantity_labeler*
		 * 	<= Date_labeler*
		 * ```
		 */
		row_content(id: any) {
			return [
				this.Id_labeler(id),
				this.Title_labeler(id),
				this.Color_labeler(id),
				this.Status_labeler(id),
				this.Quantity_labeler(id),
				this.Date_labeler(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Row*0 $mol_row
		 * 	minimal_height 100
		 * 	minimal_width 200
		 * 	sub <= row_content*
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_row()
			
			obj.minimal_height = () => 100
			obj.minimal_width = () => 200
			obj.sub = () => this.row_content(id)
			
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
	}
	
}

