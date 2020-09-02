namespace $ {
	export class $mol_image extends $mol_view {

		/**
		 * ```tree
		 * dom_name \img
		 * ```
		 */
		dom_name() {
			return "img"
		}

		/**
		 * ```tree
		 * field *
		 * 	^
		 * 	src <= uri
		 * 	alt <= title
		 * ```
		 */
		field() {
			return {
				...super.field(),
				src: this.uri(),
				alt: this.title()
			}
		}

		/**
		 * ```tree
		 * uri \
		 * ```
		 */
		uri() {
			return ""
		}
	}

}
