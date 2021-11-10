namespace $ {
	export class $mol_paginator_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title @ \Page switcher
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_paginator_demo_title' )
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
		 * page?val 0
		 * ```
		 */
		@ $mol_mem
		page(val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * Pages $mol_paginator value?val <=> page?val
		 * ```
		 */
		@ $mol_mem
		Pages() {
			const obj = new this.$.$mol_paginator()
			
			obj.value = (val?: any) => this.page(val)
			
			return obj
		}
	}
	
}

