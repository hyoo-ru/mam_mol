namespace $ {
	export class $mol_app_report extends $mol_page {

		/**
		 * ```tree
		 * title @ \Pump #1337 - Technical passport
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_app_report_title' )
		}

		/**
		 * ```tree
		 * body /
		 * 	<= descriptor $mol_view sub / <= description \
		 * 	<= tabler $mol_app_report_tabler rows <= rows / <= headRower $mol_app_report_rower cells <= headCells /
		 * ```
		 */
		body() {
			return [
				this.descriptor(),
				this.tabler()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * descriptor $mol_view sub / <= description \
		 * ```
		 */
		@ $mol_mem
		descriptor() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.description()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * description \
		 * ```
		 */
		description() {
			return ""
		}

		/**
		 * ```tree
		 * tabler $mol_app_report_tabler rows <= rows / <= headRower $mol_app_report_rower cells <= headCells /
		 * ```
		 */
		@ $mol_mem
		tabler() {
			const obj = new this.$.$mol_app_report_tabler()

			obj.rows = () => this.rows()

			return obj
		}

		/**
		 * ```tree
		 * rows / <= headRower $mol_app_report_rower cells <= headCells /
		 * ```
		 */
		rows() {
			return [
				this.headRower()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * headRower $mol_app_report_rower cells <= headCells /
		 * ```
		 */
		@ $mol_mem
		headRower() {
			const obj = new this.$.$mol_app_report_rower()

			obj.cells = () => this.headCells()

			return obj
		}

		/**
		 * ```tree
		 * headCells /
		 * ```
		 */
		headCells() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * rower!id $mol_app_report_rower cells <= rowerCells!id /
		 * ```
		 */
		@ $mol_mem_key
		rower(id: any) {
			const obj = new this.$.$mol_app_report_rower()

			obj.cells = () => this.rowerCells(id)

			return obj
		}

		/**
		 * ```tree
		 * rowerCells!id /
		 * ```
		 */
		rowerCells(id: any) {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * cell!id $mol_app_report_cell
		 * 	content <= cell_content!id null
		 * 	rows <= cellrows!id 1
		 * 	cols <= cellCols!id 1
		 * ```
		 */
		@ $mol_mem_key
		cell(id: any) {
			const obj = new this.$.$mol_app_report_cell()

			obj.content = () => this.cell_content(id)
			obj.rows = () => this.cellrows(id)
			obj.cols = () => this.cellCols(id)

			return obj
		}

		/**
		 * ```tree
		 * cell_content!id null
		 * ```
		 */
		cell_content(id: any) {
			return null as any
		}

		/**
		 * ```tree
		 * cellrows!id 1
		 * ```
		 */
		cellrows(id: any) {
			return 1
		}

		/**
		 * ```tree
		 * cellCols!id 1
		 * ```
		 */
		cellCols(id: any) {
			return 1
		}

		/**
		 * ```tree
		 * texter!id $mol_view sub / <= cell_value!id?val null
		 * ```
		 */
		@ $mol_mem_key
		texter(id: any) {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.cell_value(id)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * cell_value!id?val null
		 * ```
		 */
		@ $mol_mem_key
		cell_value(id: any, val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * select!id $mol_select
		 * 	value?val <=> cell_value!id?val null
		 * 	dictionary <= cell_options!id *
		 * ```
		 */
		@ $mol_mem_key
		select(id: any) {
			const obj = new this.$.$mol_select()

			obj.value = (val?: any) => this.cell_value(id, val)
			obj.dictionary = () => this.cell_options(id)

			return obj
		}

		/**
		 * ```tree
		 * cell_options!id *
		 * ```
		 */
		cell_options(id: any) {
			return {

			}
		}

		/**
		 * ```tree
		 * number!id $mol_number value?val <=> cell_value!id?val null
		 * ```
		 */
		@ $mol_mem_key
		number(id: any) {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.cell_value(id, val)

			return obj
		}
	}

	export class $mol_app_report_tabler extends $mol_view {

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
		 * sub <= rows /
		 * ```
		 */
		sub() {
			return this.rows()
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
	}

	export class $mol_app_report_rower extends $mol_view {

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
		 * sub <= cells /
		 * ```
		 */
		sub() {
			return this.cells()
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
	}

	export class $mol_app_report_cell extends $mol_view {

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
		 * attr *
		 * 	^
		 * 	colspan <= cols 1
		 * 	rowspan <= rows 1
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				colspan: this.cols(),
				rowspan: this.rows()
			}
		}

		/**
		 * ```tree
		 * cols 1
		 * ```
		 */
		cols() {
			return 1
		}

		/**
		 * ```tree
		 * rows 1
		 * ```
		 */
		rows() {
			return 1
		}

		/**
		 * ```tree
		 * sub / <= content null
		 * ```
		 */
		sub() {
			return [
				this.content()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * content null
		 * ```
		 */
		content() {
			return null as any
		}
	}

}
