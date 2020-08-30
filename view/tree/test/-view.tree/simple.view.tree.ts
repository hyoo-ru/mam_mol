namespace $ {
	export class $mol_view_tree_test_simple extends $mol_view {

		/**
		 * ```tree
		 * some 1
		 * ```
		 */
		some() {
			return 1
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
		 * str \test
		 * ```
		 */
		str() {
			return "test"
		}

		/**
		 * ```tree
		 * arr /
		 * ```
		 */
		arr() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * arr_string /string
		 * ```
		 */
		arr_string() {
			return [

			] as readonly string[]
		}
	}

}
