namespace $ {
	export class $mol_text extends $mol_list {
		
		/**
		 * ```tree
		 * uri_base \
		 * ```
		 */
		uri_base() {
			return ""
		}
		
		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
		}
		
		/**
		 * ```tree
		 * tokens /
		 * ```
		 */
		tokens() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Quote!id $mol_text text <= quote_text!id
		 * ```
		 */
		@ $mol_mem_key
		Quote(id: any) {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.quote_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Row!id $mol_text_row
		 * 	sub <= block_content!id
		 * 	type <= block_type!id
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_text_row()
			
			obj.sub = () => this.block_content(id)
			obj.type = () => this.block_type(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Span!id $mol_text_span
		 * ```
		 */
		@ $mol_mem_key
		Span(id: any) {
			const obj = new this.$.$mol_text_span()
			
			return obj
		}
		
		/**
		 * ```tree
		 * String!id $mol_text_string needle <= highlight
		 * ```
		 */
		@ $mol_mem_key
		String(id: any) {
			const obj = new this.$.$mol_text_string()
			
			obj.needle = () => this.highlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link!id $mol_text_link target <= link_target!id
		 * ```
		 */
		@ $mol_mem_key
		Link(id: any) {
			const obj = new this.$.$mol_text_link()
			
			obj.target = () => this.link_target(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Image!id $mol_text_image
		 * ```
		 */
		@ $mol_mem_key
		Image(id: any) {
			const obj = new this.$.$mol_text_image()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Header!id $mol_text_header
		 * 	level <= header_level!id
		 * 	content <= header_content!id
		 * ```
		 */
		@ $mol_mem_key
		Header(id: any) {
			const obj = new this.$.$mol_text_header()
			
			obj.level = () => this.header_level(id)
			obj.content = () => this.header_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Code!id $mol_text_code
		 * 	text <= code_text!id
		 * 	highlight <= highlight
		 * ```
		 */
		@ $mol_mem_key
		Code(id: any) {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.code_text(id)
			obj.highlight = () => this.highlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Table!id $mol_grid
		 * 	head_cells <= table_head_cells!id
		 * 	rows <= table_rows!id
		 * ```
		 */
		@ $mol_mem_key
		Table(id: any) {
			const obj = new this.$.$mol_grid()
			
			obj.head_cells = () => this.table_head_cells(id)
			obj.rows = () => this.table_rows(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Table_row!id $mol_grid_row cells <= table_cells!id
		 * ```
		 */
		@ $mol_mem_key
		Table_row(id: any) {
			const obj = new this.$.$mol_grid_row()
			
			obj.cells = () => this.table_cells(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Table_cell!id $mol_grid_cell sub <= table_cell_content!id
		 * ```
		 */
		@ $mol_mem_key
		Table_cell(id: any) {
			const obj = new this.$.$mol_grid_cell()
			
			obj.sub = () => this.table_cell_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Table_cell_head!id $mol_grid_cell sub <= table_cell_content!id
		 * ```
		 */
		@ $mol_mem_key
		Table_cell_head(id: any) {
			const obj = new this.$.$mol_grid_cell()
			
			obj.sub = () => this.table_cell_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * quote_text!id \
		 * ```
		 */
		quote_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * block_content!id /
		 * ```
		 */
		block_content(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * block_type!id \
		 * ```
		 */
		block_type(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * highlight \
		 * ```
		 */
		highlight() {
			return ""
		}
		
		/**
		 * ```tree
		 * link_target!id \_blank
		 * ```
		 */
		link_target(id: any) {
			return "_blank"
		}
		
		/**
		 * ```tree
		 * header_level!id 0
		 * ```
		 */
		header_level(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * header_content!id /
		 * ```
		 */
		header_content(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * code_text!id \
		 * ```
		 */
		code_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * table_head_cells!id /
		 * ```
		 */
		table_head_cells(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * table_rows!id /
		 * ```
		 */
		table_rows(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * table_cells!id /
		 * ```
		 */
		table_cells(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * table_cell_content!id /
		 * ```
		 */
		table_cell_content(id: any) {
			return [
			] as readonly any[]
		}
	}
	
	export class $mol_text_row extends $mol_paragraph {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_type <= type
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_type: this.type()
			}
		}
		
		/**
		 * ```tree
		 * type \
		 * ```
		 */
		type() {
			return ""
		}
	}
	
	export class $mol_text_header extends $mol_paragraph {
		
		/**
		 * ```tree
		 * dom_name \h
		 * ```
		 */
		dom_name() {
			return "h"
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_header_level <= level?val
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_header_level: this.level()
			}
		}
		
		/**
		 * ```tree
		 * sub <= content
		 * ```
		 */
		sub() {
			return this.content()
		}
		
		/**
		 * ```tree
		 * level?val 0
		 * ```
		 */
		@ $mol_mem
		level(val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * content /
		 * ```
		 */
		content() {
			return [
			] as readonly any[]
		}
	}
	
	export class $mol_text_span extends $mol_paragraph {
		
		/**
		 * ```tree
		 * dom_name \span
		 * ```
		 */
		dom_name() {
			return "span"
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_type <= type?val
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_type: this.type()
			}
		}
		
		/**
		 * ```tree
		 * sub <= content?val
		 * ```
		 */
		sub() {
			return this.content()
		}
		
		/**
		 * ```tree
		 * type?val \
		 * ```
		 */
		@ $mol_mem
		type(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * content?val /
		 * ```
		 */
		@ $mol_mem
		content(val?: any) {
			if ( val !== undefined ) return val as never
			return [
			] as readonly any[]
		}
	}
	
	export class $mol_text_string extends $mol_dimmer {
		
		/**
		 * ```tree
		 * dom_name \span
		 * ```
		 */
		dom_name() {
			return "span"
		}
		
		/**
		 * ```tree
		 * haystack?val \
		 * ```
		 */
		@ $mol_mem
		haystack(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
	}
	
	export class $mol_text_link extends $mol_link_iconed {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_type <= type?val
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_type: this.type()
			}
		}
		
		/**
		 * ```tree
		 * uri <= link?val
		 * ```
		 */
		uri() {
			return this.link()
		}
		
		/**
		 * ```tree
		 * content?val /
		 * ```
		 */
		@ $mol_mem
		content(val?: any) {
			if ( val !== undefined ) return val as never
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * type?val \
		 * ```
		 */
		@ $mol_mem
		type(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * link?val \
		 * ```
		 */
		@ $mol_mem
		link(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
	}
	
	export class $mol_text_image extends $mol_view {
		
		/**
		 * ```tree
		 * dom_name \object
		 * ```
		 */
		dom_name() {
			return "object"
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	allowfullscreen true
		 * 	mol_text_type <= type?val
		 * 	data <= link?val
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				allowfullscreen: true,
				mol_text_type: this.type(),
				data: this.link()
			}
		}
		
		/**
		 * ```tree
		 * sub / <= Image
		 * ```
		 */
		sub() {
			return [
				this.Image()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * type?val \
		 * ```
		 */
		@ $mol_mem
		type(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * link?val \
		 * ```
		 */
		@ $mol_mem
		link(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * title?val \
		 * ```
		 */
		@ $mol_mem
		title(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Image $mol_image
		 * 	uri <= link
		 * 	title <= title?val
		 * ```
		 */
		@ $mol_mem
		Image() {
			const obj = new this.$.$mol_image()
			
			obj.uri = () => this.link()
			obj.title = () => this.title()
			
			return obj
		}
	}
	
}

