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
		 * count 1000
		 * ```
		 */
		count() {
			return 1000
		}
		
		/**
		 * ```tree
		 * sub / <= Rows
		 * ```
		 */
		sub() {
			return [
				this.Rows()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Row# $mol_row
		 * 	minimal_height 40
		 * 	sub <= row_content#
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_row()
			
			obj.minimal_height = () => 40
			obj.sub = () => this.row_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_row
		 * 	\$mol_check
		 * 	\$mol_switch
		 * 	\$mol_time
		 * 	\$mol_link
		 * 	\list
		 * 	\table
		 * 	\scroll
		 * ```
		 */
		tags() {
			return [
				"$mol_row",
				"$mol_check",
				"$mol_switch",
				"$mol_time",
				"$mol_link",
				"list",
				"table",
				"scroll"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * rows /
		 * ```
		 */
		rows() {
			return [
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
		 * row_id# \
		 * ```
		 */
		row_id(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Id# $mol_view sub / <= row_id#
		 * ```
		 */
		@ $mol_mem_key
		Id(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.row_id(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_title# \
		 * ```
		 */
		row_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Title# $mol_view sub / <= row_title#
		 * ```
		 */
		@ $mol_mem_key
		Title(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.row_title(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * editable_title \Editable
		 * ```
		 */
		editable_title() {
			return "Editable"
		}
		
		/**
		 * ```tree
		 * row_editable#?val false
		 * ```
		 */
		@ $mol_mem_key
		row_editable(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			return false
		}
		
		/**
		 * ```tree
		 * Editable# $mol_check_box
		 * 	title <= editable_title
		 * 	checked?val <=> row_editable#?val
		 * ```
		 */
		@ $mol_mem_key
		Editable(id: any) {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.editable_title()
			obj.checked = (val?: any) => this.row_editable(id, val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_priority#?val \
		 * ```
		 */
		@ $mol_mem_key
		row_priority(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Priority# $mol_switch
		 * 	enabled <= row_editable#
		 * 	value?val <=> row_priority#?val
		 * 	options *
		 * 		minor \Minor
		 * 		major \Major
		 * 		critical \Critical
		 * ```
		 */
		@ $mol_mem_key
		Priority(id: any) {
			const obj = new this.$.$mol_switch()
			
			obj.enabled = () => this.row_editable(id)
			obj.value = (val?: any) => this.row_priority(id, val)
			obj.options = () => ({
				minor: "Minor",
				major: "Major",
				critical: "Critical"
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_moment#?val $mol_time_moment
		 * ```
		 */
		@ $mol_mem_key
		row_moment(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Date# $mol_date
		 * 	value_moment?val <=> row_moment#?val
		 * 	enabled <= row_editable#
		 * ```
		 */
		@ $mol_mem_key
		Date(id: any) {
			const obj = new this.$.$mol_date()
			
			obj.value_moment = (val?: any) => this.row_moment(id, val)
			obj.enabled = () => this.row_editable(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_uri# \
		 * ```
		 */
		row_uri(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Link# $mol_link_iconed uri <= row_uri#
		 * ```
		 */
		@ $mol_mem_key
		Link(id: any) {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.row_uri(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_content# /
		 * 	<= Id#
		 * 	<= Title#
		 * 	<= Editable#
		 * 	<= Priority#
		 * 	<= Date#
		 * 	<= Link#
		 * ```
		 */
		row_content(id: any) {
			return [
				this.Id(id),
				this.Title(id),
				this.Editable(id),
				this.Priority(id),
				this.Date(id),
				this.Link(id)
			] as readonly any[]
		}
	}
	
}

