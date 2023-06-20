namespace $ {
	export class $mol_paginator_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Page switcher
		 * ```
		 */
		title() {
			return "Page switcher"
		}
		
		/**
		 * ```tree
		 * sub / <= Pages
		 * ```
		 */
		sub() {
			return [
				this.Pages()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\paginator
		 * 	\navigation
		 * ```
		 */
		tags() {
			return [
				"paginator",
				"navigation"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Control
		 * 	\Type/Number/Integer
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control",
				"Type/Number/Integer"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * page? 0
		 * ```
		 */
		@ $mol_mem
		page(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * Pages $mol_paginator value? <=> page?
		 * ```
		 */
		@ $mol_mem
		Pages() {
			const obj = new this.$.$mol_paginator()
			
			obj.value = (next?: any) => this.page(next)
			
			return obj
		}
	}
	
}

