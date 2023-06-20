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
		 * 	<= descriptor
		 * 	<= tabler
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
		 * rower* $mol_app_report_rower cells <= rowerCells*
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
		 * cell* $mol_app_report_cell
		 * 	content <= cell_content*
		 * 	rows <= cellrows*
		 * 	cols <= cellCols*
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
		 * texter* $mol_view sub / <= cell_value*?
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
		 * select* $mol_select
		 * 	value? <=> cell_value*?
		 * 	dictionary <= cell_options*
		 * ```
		 */
		@ $mol_mem_key
		select(id: any) {
			const obj = new this.$.$mol_select()
			
			obj.value = (next?: any) => this.cell_value(id, next)
			obj.dictionary = () => this.cell_options(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * number* $mol_number value? <=> cell_value*?
		 * ```
		 */
		@ $mol_mem_key
		number(id: any) {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.cell_value(id, next)
			
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
		 * descriptor $mol_view sub / <= description
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
		 * headCells /
		 * ```
		 */
		headCells() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * headRower $mol_app_report_rower cells <= headCells
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
		 * rows / <= headRower
		 * ```
		 */
		rows() {
			return [
				this.headRower()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tabler $mol_app_report_tabler rows <= rows
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
		 * rowerCells* /
		 * ```
		 */
		rowerCells(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * cell_content* null
		 * ```
		 */
		cell_content(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * cellrows* 1
		 * ```
		 */
		cellrows(id: any) {
			return 1
		}
		
		/**
		 * ```tree
		 * cellCols* 1
		 * ```
		 */
		cellCols(id: any) {
			return 1
		}
		
		/**
		 * ```tree
		 * cell_value*? null
		 * ```
		 */
		@ $mol_mem_key
		cell_value(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * cell_options* *
		 * ```
		 */
		cell_options(id: any) {
			return {
			} as Record< string, any >
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
		 * sub <= rows
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
		 * sub <= cells
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
		 * 	colspan <= cols
		 * 	rowspan <= rows
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				colspan: this.cols(),
				rowspan: this.rows()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub / <= content
		 * ```
		 */
		sub() {
			return [
				this.content()
			] as readonly any[]
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
		 * content null
		 * ```
		 */
		content() {
			return null as any
		}
	}
	
}

