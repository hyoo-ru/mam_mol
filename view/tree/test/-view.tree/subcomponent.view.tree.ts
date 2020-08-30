namespace $ {
	export class $mol_view_tree_test_attributes_subcomponent extends $mol_view {
		// Comment

		/**
		 * ```tree
		 * Page!index $mol_view_tree_test_attributes_subcomponent_page Sub <= page!index null
		 * ```
		 */
		@ $mol_mem_key
		Page(index: any) {
			const obj = new this.$.$mol_view_tree_test_attributes_subcomponent_page()

			obj.Sub = () => this.page(index)

			return obj
		}

		/**
		 * ```tree
		 * page!index null
		 * ```
		 */
		page(index: any) {
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
