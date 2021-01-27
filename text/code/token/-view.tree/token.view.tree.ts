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
	
	export class $mol_text_code_token_link extends $mol_text_code_token {
		
		/**
		 * ```tree
		 * dom_name \a
		 * ```
		 */
		dom_name() {
			return "a"
		}
		
		/**
		 * ```tree
		 * type \code-link
		 * ```
		 */
		type() {
			return "code-link"
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	href <= haystack
		 * 	target \_blank
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				href: this.haystack(),
				target: "_blank"
			}
		}
		
		/**
		 * ```tree
		 * haystack \
		 * ```
		 */
		haystack() {
			return ""
		}
	}
	
}

