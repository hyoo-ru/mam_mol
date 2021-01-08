namespace $ {
	export class $mol_text_code_row extends $mol_paragraph {

		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
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
		 * Token!id $mol_text_code_token
		 * 	type <= token_type!id
		 * 	haystack <= token_text!id
		 * 	needle <= highlight
		 * ```
		 */
		@ $mol_mem_key
		Token(id: any) {
			const obj = new this.$.$mol_text_code_token()

			obj.type = () => this.token_type(id)
			obj.haystack = () => this.token_text(id)
			obj.needle = () => this.highlight()

			return obj
		}

		/**
		 * ```tree
		 * token_type!id \
		 * ```
		 */
		token_type(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * token_text!id \
		 * ```
		 */
		token_text(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * highlight \
		 * ```
		 */
		highlight() {
			return ""
		}
	}

}
