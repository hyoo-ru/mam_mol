namespace $ {
	export class $mol_perf_uibench_table extends $mol_list {
		
		/**
		 * ```tree
		 * state null
		 * ```
		 */
		state() {
			return null as any
		}
		
		/**
		 * ```tree
		 * dom_name \table
		 * ```
		 */
		dom_name() {
			return "table"
		}
		
		/**
		 * ```tree
		 * attr_static *
		 * 	^
		 * 	class \Table
		 * ```
		 */
		attr_static() {
			return {
				...super.attr_static(),
				class: "Table"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub <= rows
		 * ```
		 */
		sub() {
			return this.rows()
		}
		
		/**
		 * ```tree
		 * Row* $mol_perf_uibench_table_row state <= row_state*
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_perf_uibench_table_row()
			
			obj.state = () => this.row_state(id)
			
			return obj
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
		 * row_state* null
		 * ```
		 */
		row_state(id: any) {
			return null as any
		}
	}
	
	export class $mol_perf_uibench_table_row extends $mol_view {
		
		/**
		 * ```tree
		 * state null
		 * ```
		 */
		state() {
			return null as any
		}
		
		/**
		 * ```tree
		 * minimal_height 18
		 * ```
		 */
		minimal_height() {
			return 18
		}
		
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
		 * attr *
		 * 	^
		 * 	class <= classes
		 * 	data-id <= id
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				class: this.classes(),
				"data-id": this.id()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Head
		 * 	<= cells
		 * ```
		 */
		sub() {
			return [
				this.Head(),
				this.cells()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Cell* $mol_perf_uibench_table_cell text <= cell_state*
		 * ```
		 */
		@ $mol_mem_key
		Cell(id: any) {
			const obj = new this.$.$mol_perf_uibench_table_cell()
			
			obj.text = () => this.cell_state(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * classes \TableRow
		 * ```
		 */
		classes() {
			return "TableRow"
		}
		
		/**
		 * ```tree
		 * id 0
		 * ```
		 */
		id() {
			return 0
		}
		
		/**
		 * ```tree
		 * head_text \
		 * ```
		 */
		head_text() {
			return ""
		}
		
		/**
		 * ```tree
		 * Head $mol_perf_uibench_table_cell text <= head_text
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_perf_uibench_table_cell()
			
			obj.text = () => this.head_text()
			
			return obj
		}
		
		/**
		 * ```tree
		 * cells /
		 * ```
		 */
		cells() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * cell_state* null
		 * ```
		 */
		cell_state(id: any) {
			return null as any
		}
	}
	
	export class $mol_perf_uibench_table_cell extends $mol_view {
		
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
		 * attr_static *
		 * 	^
		 * 	class \TableCell
		 * ```
		 */
		attr_static() {
			return {
				...super.attr_static(),
				class: "TableCell"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	click? <=> click?
		 * ```
		 */
		event() {
			return {
				...super.event(),
				click: (next?: any) => this.click(next)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub / <= text
		 * ```
		 */
		sub() {
			return [
				this.text()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * click? null
		 * ```
		 */
		@ $mol_mem
		click(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
		}
	}
	
}

