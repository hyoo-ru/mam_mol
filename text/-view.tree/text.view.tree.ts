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
		 * flow_tokens /
		 * ```
		 */
		flow_tokens() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Paragraph* $mol_paragraph sub <= block_content*
		 * ```
		 */
		@ $mol_mem_key
		Paragraph(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => this.block_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Quote* $mol_text text <= quote_text*
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
		 * List* $mol_text text <= list_text*
		 * ```
		 */
		@ $mol_mem_key
		List(id: any) {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.list_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Header* $mol_paragraph
		 * 	dom_name <= header_level*
		 * 	sub <= block_content*
		 * ```
		 */
		@ $mol_mem_key
		Header(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.dom_name = () => this.header_level(id)
			obj.sub = () => this.block_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Code* $mol_text_code
		 * 	text <= code_text*
		 * 	highlight <= highlight
		 * 	sidebar_showed <= code_sidebar_showed
		 * ```
		 */
		@ $mol_mem_key
		Code(id: any) {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.code_text(id)
			obj.highlight = () => this.highlight()
			obj.sidebar_showed = () => this.code_sidebar_showed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Table* $mol_grid
		 * 	head_cells <= table_head_cells*
		 * 	rows <= table_rows*
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
		 * Table_row* $mol_grid_row cells <= table_cells*
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
		 * Table_cell* $mol_text text <= table_cell_text*
		 * ```
		 */
		@ $mol_mem_key
		Table_cell(id: any) {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.table_cell_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * String* $mol_dimmer
		 * 	dom_name \span
		 * 	needle <= highlight
		 * 	haystack <= line_text*
		 * ```
		 */
		@ $mol_mem_key
		String(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.dom_name = () => "span"
			obj.needle = () => this.highlight()
			obj.haystack = () => this.line_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Span* $mol_text_span
		 * 	dom_name \span
		 * 	type <= line_type*
		 * 	sub <= line_content*
		 * ```
		 */
		@ $mol_mem_key
		Span(id: any) {
			const obj = new this.$.$mol_text_span()
			
			obj.dom_name = () => "span"
			obj.type = () => this.line_type(id)
			obj.sub = () => this.line_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Code_line* $mol_text_code_row
		 * 	numb_showed false
		 * 	highlight <= highlight
		 * 	text <= line_text*
		 * ```
		 */
		@ $mol_mem_key
		Code_line(id: any) {
			const obj = new this.$.$mol_text_code_row()
			
			obj.numb_showed = () => false
			obj.highlight = () => this.highlight()
			obj.text = () => this.line_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link* $mol_link_iconed
		 * 	uri <= link_uri*
		 * 	target <= link_target*
		 * 	content <= line_content*
		 * ```
		 */
		@ $mol_mem_key
		Link(id: any) {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.link_uri(id)
			obj.target = () => this.link_target(id)
			obj.content = () => this.line_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link_http* $mol_link_iconed
		 * 	uri <= link_uri*
		 * 	target <= link_target*
		 * 	content / <= String*
		 * ```
		 */
		@ $mol_mem_key
		Link_http(id: any) {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.link_uri(id)
			obj.target = () => this.link_target(id)
			obj.content = () => [
				this.String(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Image* $mol_embed_native
		 * 	uri <= link_uri*
		 * 	sub <= line_content*
		 * ```
		 */
		@ $mol_mem_key
		Image(id: any) {
			const obj = new this.$.$mol_embed_native()
			
			obj.uri = () => this.link_uri(id)
			obj.sub = () => this.line_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * block_content* /
		 * ```
		 */
		block_content(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * quote_text* \
		 * ```
		 */
		quote_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * list_text* \
		 * ```
		 */
		list_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * header_level* \h
		 * ```
		 */
		header_level(id: any) {
			return "h"
		}
		
		/**
		 * ```tree
		 * code_text* \
		 * ```
		 */
		code_text(id: any) {
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
		 * code_sidebar_showed true
		 * ```
		 */
		code_sidebar_showed() {
			return true
		}
		
		/**
		 * ```tree
		 * table_head_cells* /
		 * ```
		 */
		table_head_cells(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * table_rows* /
		 * ```
		 */
		table_rows(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * table_cells* /
		 * ```
		 */
		table_cells(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * table_cell_text* \
		 * ```
		 */
		table_cell_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * line_text* \
		 * ```
		 */
		line_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * line_type* \
		 * ```
		 */
		line_type(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * line_content* /
		 * ```
		 */
		line_content(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * link_uri* \
		 * ```
		 */
		link_uri(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * link_target* \_blank
		 * ```
		 */
		link_target(id: any) {
			return "_blank"
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
	
}

