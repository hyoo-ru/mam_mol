namespace $ {
	export class $mol_grid extends $mol_scroll {

		/**
		 * ```tree
		 * row_height 40
		 * ```
		 */
		row_height() {
			return 40
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
		 * row_id!index null
		 * ```
		 */
		row_id(index: any) {
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

			}
		}

		/**
		 * ```tree
		 * record!id null
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
		 * Row!id $mol_grid_row
		 * 	minimal_height <= row_height
		 * 	cells <= cells!id
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_grid_row()

			obj.minimal_height = () => this.row_height()
			obj.cells = () => this.cells(id)

			return obj
		}


		/**
		 * ```tree
		 * Cell!id $mol_view
		 * ```
		 */
		@ $mol_mem_key
		Cell(id: any) {
			const obj = new this.$.$mol_view()

			return obj
		}

		/**
		 * ```tree
		 * cell!id null
		 * ```
		 */
		cell(id: any) {
			return null as any
		}

		/**
		 * ```tree
		 * Cell_text!id $mol_grid_cell sub <= cell_content_text!id
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
		 * Cell_number!id $mol_grid_number sub <= cell_content_number!id
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
		 * Col_head!id $mol_float
		 * 	dom_name \th
		 * 	sub <= col_head_content!id
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
		 * Cell_branch!id $mol_check_expand
		 * 	level <= cell_level!id
		 * 	label <= cell_content!id
		 * 	expanded?val <=> cell_expanded!id?val
		 * ```
		 */
		@ $mol_mem_key
		Cell_branch(id: any) {
			const obj = new this.$.$mol_check_expand()

			obj.level = () => this.cell_level(id)
			obj.label = () => this.cell_content(id)
			obj.expanded = (val?: any) => this.cell_expanded(id, val)

			return obj
		}

		/**
		 * ```tree
		 * Cell_content!id / <= Cell_dimmer!id
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
		 * cells!id /$mol_view
		 * ```
		 */
		cells(id: any) {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * cell_content!id /$mol_view_content
		 * ```
		 */
		cell_content(id: any) {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * cell_content_text!id <= cell_content!id
		 * ```
		 */
		cell_content_text(id: any) {
			return this.cell_content(id)
		}

		/**
		 * ```tree
		 * cell_content_number!id <= cell_content!id
		 * ```
		 */
		cell_content_number(id: any) {
			return this.cell_content(id)
		}

		/**
		 * ```tree
		 * col_head_content!id /$mol_view_content
		 * ```
		 */
		col_head_content(id: any) {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * cell_level!id 0
		 * ```
		 */
		cell_level(id: any) {
			return 0
		}

		/**
		 * ```tree
		 * cell_expanded!id?val false
		 * ```
		 */
		@ $mol_mem_key
		cell_expanded(id: any, val?: any) {
			if ( val !== undefined ) return val
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
		 * cell_value!id \
		 * ```
		 */
		cell_value(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * Cell_dimmer!id $mol_dimmer
		 * 	needle <= needle
		 * 	haystack <= cell_value!id
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

		/**
		 * ```tree
		 * dom_name \table
		 * ```
		 */
		dom_name() {
			return "table"
		}
	}

	export class $mol_grid_row extends $mol_view {

		/**
		 * ```tree
		 * dom_name \tr
		 * ```
		 */
		dom_name() {
			return "tr"
		}

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
		 * dom_name \td
		 * ```
		 */
		dom_name() {
			return "td"
		}

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
