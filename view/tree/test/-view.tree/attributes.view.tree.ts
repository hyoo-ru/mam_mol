namespace $ {
	export class $mol_view_tree_test_attributes_super extends $mol_view {

		/**
		 * ```tree
		 * some *
		 * 	a 0
		 * 	b 2
		 * ```
		 */
		some() {
			return {
				a: 0,
				b: 2
			}
		}
	}

	export class $mol_view_tree_test_attributes extends $mol_view_tree_test_attributes_super {

		/**
		 * ```tree
		 * some *
		 * 	^
		 * 	a 1
		 * ```
		 */
		some() {
			return {
				...super.some(),
				a: 1
			}
		}
	}

}
