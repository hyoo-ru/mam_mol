namespace $ {
	export class $mol_view_tree2_test_sample_simple extends $mol_view {

		/**
		 * ```tree
		 * str \some
		 * ```
		 */
		str() {
			return "some"
		}

		/**
		 * ```tree
		 * num 12317
		 * ```
		 */
		num() {
			return 12317
		}

		/**
		 * ```tree
		 * bool true
		 * ```
		 */
		bool() {
			return true
		}

		/**
		 * ```tree
		 * nul null
		 * ```
		 */
		nul() {
			return null as any
		}

		/**
		 * ```tree
		 * localized @ \localized value
		 * ```
		 */
		localized() {
			return this.$.$mol_locale.text( '$mol_view_tree2_test_sample_simple_localized' )
		}
	}

}
