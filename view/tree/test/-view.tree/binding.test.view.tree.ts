namespace $ {
	export class $mol_view_tree_test_binding extends $mol_view {
		
		/**
		 * ```tree
		 * value? <=> task_title_new?
		 * ```
		 */
		value(next?: any) {
			return this.task_title_new(next)
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
		 * task_title_new? \123
		 * ```
		 */
		@ $mol_mem
		task_title_new(next?: any) {
			if ( next !== undefined ) return next as never
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

