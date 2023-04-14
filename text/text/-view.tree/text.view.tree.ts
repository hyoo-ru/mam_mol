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
		 * param \
		 * ```
		 */
		param() {
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
		 * auto / <= auto_scroll
		 * ```
		 */
		auto() {
			return [
				this.auto_scroll()
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
		 * Quote* $mol_text
		 * 	uri_resolve* <= uri_resolve*
		 * 	text <= quote_text*
		 * 	highlight <= highlight
		 * 	auto_scroll null
		 * ```
		 */
		@ $mol_mem_key
		Quote(id: any) {
			const obj = new this.$.$mol_text()
			
			obj.uri_resolve = (id: any) => this.uri_resolve(id)
			obj.text = () => this.quote_text(id)
			obj.highlight = () => this.highlight()
			obj.auto_scroll = () => null as any
			
			return obj
		}
		
		/**
		 * ```tree
		 * List* $mol_text_list
		 * 	uri_resolve* <= uri_resolve*
		 * 	type <= list_type*
		 * 	text <= list_text*
		 * 	highlight <= highlight
		 * ```
		 */
		@ $mol_mem_key
		List(id: any) {
			const obj = new this.$.$mol_text_list()
			
			obj.uri_resolve = (id: any) => this.uri_resolve(id)
			obj.type = () => this.list_type(id)
			obj.text = () => this.list_text(id)
			obj.highlight = () => this.highlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * item_index* 0
		 * ```
		 */
		item_index(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * Header* $mol_text_header
		 * 	minimal_height 40
		 * 	level <= header_level*
		 * 	content <= block_content*
		 * 	arg <= header_arg*
		 * ```
		 */
		@ $mol_mem_key
		Header(id: any) {
			const obj = new this.$.$mol_text_header()
			
			obj.minimal_height = () => 40
			obj.level = () => this.header_level(id)
			obj.content = () => this.block_content(id)
			obj.arg = () => this.header_arg(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pre* $mol_text_code
		 * 	text <= pre_text*
		 * 	highlight <= highlight
		 * 	uri_resolve* <= uri_resolve*
		 * 	sidebar_showed <= pre_sidebar_showed
		 * ```
		 */
		@ $mol_mem_key
		Pre(id: any) {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.pre_text(id)
			obj.highlight = () => this.highlight()
			obj.uri_resolve = (id: any) => this.uri_resolve(id)
			obj.sidebar_showed = () => this.pre_sidebar_showed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cut* $mol_view dom_name \hr
		 * ```
		 */
		@ $mol_mem_key
		Cut(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.dom_name = () => "hr"
			
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
		 * Table_cell* $mol_text
		 * 	auto_scroll null
		 * 	highlight <= highlight
		 * 	uri_resolve* <= uri_resolve*
		 * 	text <= table_cell_text*
		 * ```
		 */
		@ $mol_mem_key
		Table_cell(id: any) {
			const obj = new this.$.$mol_text()
			
			obj.auto_scroll = () => null as any
			obj.highlight = () => this.highlight()
			obj.uri_resolve = (id: any) => this.uri_resolve(id)
			obj.text = () => this.table_cell_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Grid* $mol_grid rows <= grid_rows*
		 * ```
		 */
		@ $mol_mem_key
		Grid(id: any) {
			const obj = new this.$.$mol_grid()
			
			obj.rows = () => this.grid_rows(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Grid_row* $mol_grid_row cells <= grid_cells*
		 * ```
		 */
		@ $mol_mem_key
		Grid_row(id: any) {
			const obj = new this.$.$mol_grid_row()
			
			obj.cells = () => this.grid_cells(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Grid_cell* $mol_text
		 * 	auto_scroll null
		 * 	highlight <= highlight
		 * 	uri_resolve* <= uri_resolve*
		 * 	text <= grid_cell_text*
		 * ```
		 */
		@ $mol_mem_key
		Grid_cell(id: any) {
			const obj = new this.$.$mol_text()
			
			obj.auto_scroll = () => null as any
			obj.highlight = () => this.highlight()
			obj.uri_resolve = (id: any) => this.uri_resolve(id)
			obj.text = () => this.grid_cell_text(id)
			
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
		 * 	uri_resolve* <= uri_resolve*
		 * 	syntax <= code_syntax
		 * ```
		 */
		@ $mol_mem_key
		Code_line(id: any) {
			const obj = new this.$.$mol_text_code_row()
			
			obj.numb_showed = () => false
			obj.highlight = () => this.highlight()
			obj.text = () => this.line_text(id)
			obj.uri_resolve = (id: any) => this.uri_resolve(id)
			obj.syntax = () => this.code_syntax()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link* $mol_link_iconed
		 * 	uri <= link_uri*
		 * 	content <= line_content*
		 * ```
		 */
		@ $mol_mem_key
		Link(id: any) {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.link_uri(id)
			obj.content = () => this.line_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link_http* $mol_link_iconed
		 * 	uri <= link_uri*
		 * 	content / <= link_host*
		 * ```
		 */
		@ $mol_mem_key
		Link_http(id: any) {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.link_uri(id)
			obj.content = () => [
				this.link_host(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Embed* $mol_embed_any
		 * 	uri <= link_uri*
		 * 	title <= line_text*
		 * ```
		 */
		@ $mol_mem_key
		Embed(id: any) {
			const obj = new this.$.$mol_embed_any()
			
			obj.uri = () => this.link_uri(id)
			obj.title = () => this.line_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * auto_scroll null
		 * ```
		 */
		auto_scroll() {
			return null as any
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
		 * uri_resolve* \
		 * ```
		 */
		uri_resolve(id: any) {
			return ""
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
		 * highlight \
		 * ```
		 */
		highlight() {
			return ""
		}
		
		/**
		 * ```tree
		 * list_type* \-
		 * ```
		 */
		list_type(id: any) {
			return "-"
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
		 * header_level* 1
		 * ```
		 */
		header_level(id: any) {
			return 1
		}
		
		/**
		 * ```tree
		 * header_arg* *
		 * ```
		 */
		header_arg(id: any) {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * pre_text* \
		 * ```
		 */
		pre_text(id: any) {
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
		 * pre_sidebar_showed <= code_sidebar_showed
		 * ```
		 */
		pre_sidebar_showed() {
			return this.code_sidebar_showed()
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
		 * grid_rows* /
		 * ```
		 */
		grid_rows(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * grid_cells* /
		 * ```
		 */
		grid_cells(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * grid_cell_text* \
		 * ```
		 */
		grid_cell_text(id: any) {
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
		 * code_syntax null
		 * ```
		 */
		code_syntax() {
			return null as any
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
		 * link_host* \
		 * ```
		 */
		link_host(id: any) {
			return ""
		}
	}
	
	export class $mol_text_header extends $mol_paragraph {
		
		/**
		 * ```tree
		 * level 1
		 * ```
		 */
		level() {
			return 1
		}
		
		/**
		 * ```tree
		 * sub / <= Link
		 * ```
		 */
		sub() {
			return [
				this.Link()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * arg *
		 * ```
		 */
		arg() {
			return {
			} as Record< string, any >
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
		
		/**
		 * ```tree
		 * Link $mol_link
		 * 	arg <= arg
		 * 	hint @ \Permalink to this section
		 * 	sub <= content
		 * ```
		 */
		@ $mol_mem
		Link() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => this.arg()
			obj.hint = () => this.$.$mol_locale.text( '$mol_text_header_Link_hint' )
			obj.sub = () => this.content()
			
			return obj
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
			} as Record< string, any >
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

