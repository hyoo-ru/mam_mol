namespace $ {
	export class $mol_switch extends $mol_check_list {
		
		/**
		 * ```tree
		 * value? \
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
	}
	
}

