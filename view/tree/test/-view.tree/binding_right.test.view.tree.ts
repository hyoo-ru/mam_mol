namespace $ {
	export class $mol_view_tree_test_binding_right extends $mol_view {
		
		/**
		 * ```tree
		 * outer_width?v
		 * ```
		 */
		outer_width(v?: any) {
			return this.Test().width(v)
		}
		
		/**
		 * ```tree
		 * Test $mol_view_tree_test_binding_right_test width?v => outer_width?v
		 * ```
		 */
		@ $mol_mem
		Test() {
			const obj = new this.$.$mol_view_tree_test_binding_right_test()
			
			return obj
		}
	}
	
	export class $mol_view_tree_test_binding_right_test extends $mol_view {
		
		/**
		 * ```tree
		 * width? 0
		 * ```
		 */
		@ $mol_mem
		width(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
	}
	
}

