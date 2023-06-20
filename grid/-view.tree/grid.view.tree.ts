namespace $ {
	export class $mol_grid extends $mol_view {
		
		/**
		 * ```tree
		 * row_height 32
		 * ```
		 */
		row_height() {
			return 32
		}
		
		/**
		 * ```tree
		 * row_ids /string[]
		 * ```
		 */
		row_ids() {
			return [
			] as readonly (string[])[]
		}
		
		/**
		 * ```tree
		 * row_id* null
		 * ```
		 */
		row_id(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * col_ids /
		 * ```
		 */
		col_ids() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * records *
		 * ```
		 */
		records() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * record* null
		 * ```
		 */
		record(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * hierarchy null
		 * ```
		 */
		hierarchy() {
			return null as any
		}
		
		/**
		 * ```tree
		 * hierarchy_col \
		 * ```
		 */
		hierarchy_col() {
			return ""
		}
		
		/**
		 * ```tree
		 * minimal_width 0
		 * ```
		 */
		minimal_width() {
			return 0
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Head
		 * 	<= Table
		 * ```
		 */
		sub() {
			return [
				this.Head(),
				this.Table()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Head $mol_grid_row cells <= head_cells
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_grid_row()
			
			obj.cells = () => this.head_cells()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Row* $mol_grid_row
		 * 	minimal_height <= row_height
		 * 	minimal_width <= minimal_width
		 * 	cells <= cells*
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_grid_row()
			
			obj.minimal_height = () => this.row_height()
			obj.minimal_width = () => this.minimal_width()
			obj.cells = () => this.cells(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cell* $mol_view
		 * ```
		 */
		@ $mol_mem_key
		Cell(id: any) {
			const obj = new this.$.$mol_view()
			
			return obj
		}
		
		/**
		 * ```tree
		 * cell* null
		 * ```
		 */
		cell(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * Cell_text* $mol_grid_cell sub <= cell_content_text*
		 * ```
		 */
		@ $mol_mem_key
		Cell_text(id: any) {
			const obj = new this.$.$mol_grid_cell()
			
			obj.sub = () => this.cell_content_text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cell_number* $mol_grid_number sub <= cell_content_number*
		 * ```
		 */
		@ $mol_mem_key
		Cell_number(id: any) {
			const obj = new this.$.$mol_grid_number()
			
			obj.sub = () => this.cell_content_number(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Col_head* $mol_float
		 * 	dom_name \th
		 * 	sub <= col_head_content*
		 * ```
		 */
		@ $mol_mem_key
		Col_head(id: any) {
			const obj = new this.$.$mol_float()
			
			obj.dom_name = () => "th"
			obj.sub = () => this.col_head_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cell_branch* $mol_check_expand
		 * 	level <= cell_level*
		 * 	label <= cell_content*
		 * 	expanded? <=> cell_expanded*?
		 * ```
		 */
		@ $mol_mem_key
		Cell_branch(id: any) {
			const obj = new this.$.$mol_check_expand()
			
			obj.level = () => this.cell_level(id)
			obj.label = () => this.cell_content(id)
			obj.expanded = (next?: any) => this.cell_expanded(id, next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cell_content* / <= Cell_dimmer*
		 * ```
		 */
		Cell_content(id: any) {
			return [
				this.Cell_dimmer(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * rows /$mol_view
		 * ```
		 */
		rows() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Table $mol_grid_table sub <= rows
		 * ```
		 */
		@ $mol_mem
		Table() {
			const obj = new this.$.$mol_grid_table()
			
			obj.sub = () => this.rows()
			
			return obj
		}
		
		/**
		 * ```tree
		 * head_cells /$mol_view
		 * ```
		 */
		head_cells() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * cells* /$mol_view
		 * ```
		 */
		cells(id: any) {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * cell_content* /$mol_view_content
		 * ```
		 */
		cell_content(id: any) {
			return [
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * cell_content_text* <= cell_content*
		 * ```
		 */
		cell_content_text(id: any) {
			return this.cell_content(id)
		}
		
		/**
		 * ```tree
		 * cell_content_number* <= cell_content*
		 * ```
		 */
		cell_content_number(id: any) {
			return this.cell_content(id)
		}
		
		/**
		 * ```tree
		 * col_head_content* /$mol_view_content
		 * ```
		 */
		col_head_content(id: any) {
			return [
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * cell_level* 0
		 * ```
		 */
		cell_level(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * cell_expanded*? false
		 * ```
		 */
		@ $mol_mem_key
		cell_expanded(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * needle \
		 * ```
		 */
		needle() {
			return ""
		}
		
		/**
		 * ```tree
		 * cell_value* \
		 * ```
		 */
		cell_value(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Cell_dimmer* $mol_dimmer
		 * 	needle <= needle
		 * 	haystack <= cell_value*
		 * ```
		 */
		@ $mol_mem_key
		Cell_dimmer(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.needle = () => this.needle()
			obj.haystack = () => this.cell_value(id)
			
			return obj
		}
	}
	
	export class $mol_grid_table extends $mol_list {
	}
	
	export class $mol_grid_row extends $mol_view {
		
		/**
		 * ```tree
		 * sub <= cells
		 * ```
		 */
		sub() {
			return this.cells()
		}
		
		/**
		 * ```tree
		 * cells /$mol_view
		 * ```
		 */
		cells() {
			return [
			] as readonly $mol_view[]
		}
	}
	
	export class $mol_grid_cell extends $mol_view {
		
		/**
		 * ```tree
		 * minimal_height 40
		 * ```
		 */
		minimal_height() {
			return 40
		}
	}
	
	export class $mol_grid_number extends $mol_grid_cell {
	}
	
}

