namespace $ {
	export class $mol_text_code_token extends $mol_dimmer {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_code_token_type <= type
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_code_token_type: this.type()
			}
		}

		/**
		 * ```tree
		 * type \
		 * ```
		 */
		type() {
			return ""
		}
	}

}
