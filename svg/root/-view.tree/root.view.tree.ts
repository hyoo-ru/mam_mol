namespace $ {
	export class $mol_svg_root extends $mol_svg {

		/**
		 * ```tree
		 * dom_name \svg
		 * ```
		 */
		dom_name() {
			return "svg"
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	viewBox <= view_box \0 0 100 100
		 * 	preserveAspectRatio <= aspect \xMidYMid
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				viewBox: this.view_box(),
				preserveAspectRatio: this.aspect()
			}
		}

		/**
		 * ```tree
		 * view_box \0 0 100 100
		 * ```
		 */
		view_box() {
			return "0 0 100 100"
		}

		/**
		 * ```tree
		 * aspect \xMidYMid
		 * ```
		 */
		aspect() {
			return "xMidYMid"
		}
	}

}
