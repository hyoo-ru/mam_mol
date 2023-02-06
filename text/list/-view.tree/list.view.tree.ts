namespace $ {
	export class $mol_text_list extends $mol_text {
		
		/**
		 * ```tree
		 * auto_scroll null
		 * ```
		 */
		auto_scroll() {
			return null as any
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_list_type <= type
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_list_type: this.type()
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

