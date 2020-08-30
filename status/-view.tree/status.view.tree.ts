namespace $ {
	export class $mol_status extends $mol_view {

		/**
		 * ```tree
		 * status null
		 * ```
		 */
		status() {
			return null as any
		}

		/**
		 * ```tree
		 * minimal_height 24
		 * ```
		 */
		minimal_height() {
			return 24
		}

		/**
		 * ```tree
		 * minimal_width 0
		 * ```
		 */
		minimal_width() {
			return 0
		}

		/**
		 * ```tree
		 * sub / <= message \
		 * ```
		 */
		sub() {
			return [
				this.message()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * message \
		 * ```
		 */
		message() {
			return ""
		}
	}

}
