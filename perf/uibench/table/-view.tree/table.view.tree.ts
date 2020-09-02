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
			}
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
		 * Row!index $mol_perf_uibench_table_row state <= row_state!index
		 * ```
		 */
		@ $mol_mem_key
		Row(index: any) {
			const obj = new this.$.$mol_perf_uibench_table_row()

			obj.state = () => this.row_state(index)

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
		 * row_state!index null
		 * ```
		 */
		row_state(index: any) {
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
			}
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
		 * Cell!index $mol_perf_uibench_table_cell text <= cell_state!index
		 * ```
		 */
		@ $mol_mem_key
		Cell(index: any) {
			const obj = new this.$.$mol_perf_uibench_table_cell()

			obj.text = () => this.cell_state(index)

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
		 * cell_state!index null
		 * ```
		 */
		cell_state(index: any) {
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
			}
		}

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	click?val <=> click?val
		 * ```
		 */
		event() {
			return {
				...super.event(),
				click: (val?: any) => this.click(val)
			}
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
		 * click?val null
		 * ```
		 */
		@ $mol_mem
		click(val?: any) {
			if ( val !== undefined ) return val
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
