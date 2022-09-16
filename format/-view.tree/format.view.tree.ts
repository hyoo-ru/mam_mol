namespace $ {
	export class $mol_format extends $mol_string {
		
		/**
		 * ```tree
		 * allow \0123456789
		 * ```
		 */
		allow() {
			return "0123456789"
		}
		
		/**
		 * ```tree
		 * hint <= mask*0
		 * ```
		 */
		hint() {
			return this.mask("0")
		}
		
		/**
		 * ```tree
		 * mask*0 \
		 * ```
		 */
		mask(id: any) {
			return ""
		}
	}
	
}

