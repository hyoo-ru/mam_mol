namespace $ {
	export class $mol_svg_path extends $mol_svg {

		/**
		 * ```tree
		 * dom_name \path
		 * ```
		 */
		dom_name() {
			return "path"
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	d <= geometry \
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				d: this.geometry()
			}
		}

		/**
		 * ```tree
		 * geometry \
		 * ```
		 */
		geometry() {
			return ""
		}
	}

}
