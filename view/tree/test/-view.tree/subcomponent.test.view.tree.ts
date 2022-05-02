namespace $ {
	export class $mol_view_tree_test_attributes_subcomponent extends $mol_view {
		
		/**
		 * ```tree
		 * Page# $mol_view_tree_test_attributes_subcomponent_page Sub <= page#
		 * ```
		 */
		@ $mol_mem_key
		Page(id: any) {
			const obj = new this.$.$mol_view_tree_test_attributes_subcomponent_page()
			
			obj.Sub = () => this.page(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * page# null
		 * ```
		 */
		page(id: any) {
			return null as any
		}
	}
	
	export class $mol_view_tree_test_attributes_subcomponent_page extends $mol_view {
		
		/**
		 * ```tree
		 * Sub null
		 * ```
		 */
		Sub() {
			return null as any
		}
	}
	
}

