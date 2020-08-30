namespace $ {
	export class $mol_paginator_demo extends $mol_demo_small {

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
		 * sub / <= Pages $mol_paginator value?val <=> page?val 0
		 * ```
		 */
		sub() {
			return [
				this.Pages()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Pages $mol_paginator value?val <=> page?val 0
		 * ```
		 */
		@ $mol_mem
		Pages() {
			const obj = new this.$.$mol_paginator()

			obj.value = (val?: any) => this.page(val)

			return obj
		}

		/**
		 * ```tree
		 * page?val 0
		 * ```
		 */
		@ $mol_mem
		page(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}
	}

}
