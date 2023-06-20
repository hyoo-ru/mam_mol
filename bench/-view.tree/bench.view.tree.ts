namespace $ {
	export class $mol_bench extends $mol_grid {
		
		/**
		 * ```tree
		 * records <= result
		 * ```
		 */
		records() {
			return this.result()
		}
		
		/**
		 * ```tree
		 * col_sort? \
		 * ```
		 */
		@ $mol_mem
		col_sort(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Col_head* $mol_bench_head
		 * 	event_click? <=> event_sort_toggle*?
		 * 	sub <= col_head_content*
		 * ```
		 */
		@ $mol_mem_key
		Col_head(id: any) {
			const obj = new this.$.$mol_bench_head()
			
			obj.event_click = (next?: any) => this.event_sort_toggle(id, next)
			obj.sub = () => this.col_head_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * cell_content_number* /
		 * 	<= result_value*
		 * 	<= Result_portion*
		 * ```
		 */
		cell_content_number(id: any) {
			return [
				this.result_value(id),
				this.Result_portion(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * result *
		 * ```
		 */
		result() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event_sort_toggle*? null
		 * ```
		 */
		@ $mol_mem_key
		event_sort_toggle(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * col_head_title* \
		 * ```
		 */
		col_head_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Col_head_sort* $mol_icon_sort_asc
		 * ```
		 */
		@ $mol_mem_key
		Col_head_sort(id: any) {
			const obj = new this.$.$mol_icon_sort_asc()
			
			return obj
		}
		
		/**
		 * ```tree
		 * col_head_content* /
		 * 	<= col_head_title*
		 * 	<= Col_head_sort*
		 * ```
		 */
		col_head_content(id: any) {
			return [
				this.col_head_title(id),
				this.Col_head_sort(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * result_value* \
		 * ```
		 */
		result_value(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * result_portion* 0
		 * ```
		 */
		result_portion(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * Result_portion* $mol_portion portion <= result_portion*
		 * ```
		 */
		@ $mol_mem_key
		Result_portion(id: any) {
			const obj = new this.$.$mol_portion()
			
			obj.portion = () => this.result_portion(id)
			
			return obj
		}
	}
	
	export class $mol_bench_head extends $mol_float {
		
		/**
		 * ```tree
		 * horizontal false
		 * ```
		 */
		horizontal() {
			return false
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	click? <=> event_click?
		 * ```
		 */
		event() {
			return {
				...super.event(),
				click: (next?: any) => this.event_click(next)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	title <= hint
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				title: this.hint()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event_click? null
		 * ```
		 */
		@ $mol_mem
		event_click(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * hint @ \Click to sort by this column
		 * ```
		 */
		hint() {
			return this.$.$mol_locale.text( '$mol_bench_head_hint' )
		}
	}
	
}

