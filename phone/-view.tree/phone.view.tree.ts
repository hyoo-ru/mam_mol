namespace $ {
	export class $mol_phone extends $mol_format {
		
		/**
		 * ```tree
		 * mask* \+___ (___) ___-__-__
		 * ```
		 */
		mask(id: any) {
			return "+___ (___) ___-__-__"
		}
		
		/**
		 * ```tree
		 * keyboard \tel
		 * ```
		 */
		keyboard() {
			return "tel"
		}
	}
	
}

