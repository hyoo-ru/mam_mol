namespace $ {
	export class $mol_view_tree_test_binding extends $mol_view {

		/**
		 * ```tree
		 * value?val <=> task_title_new?val
		 * ```
		 */
		value(val?: any) {
			return this.task_title_new(val)
		}

		/**
		 * ```tree
		 * enabled <= head_complete_enabled
		 * ```
		 */
		enabled() {
			return this.head_complete_enabled()
		}

		/**
		 * ```tree
		 * task_title_new?val \123
		 * ```
		 */
		@ $mol_mem
		task_title_new(val?: any) {
			if ( val !== undefined ) return val
			return "123"
		}

		/**
		 * ```tree
		 * head_complete_enabled false
		 * ```
		 */
		head_complete_enabled() {
			return false
		}
	}

}
