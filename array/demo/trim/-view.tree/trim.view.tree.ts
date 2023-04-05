namespace $ {
	export class $mol_array_demo_trim extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const array_with_undefined = [ undefined , null , 0, false , null , undefined , undefined ]
		 * 	\const trimmed_array = $mol_array_trim(array_with_undefined)
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const array_with_undefined = [ undefined , null , 0, false , null , undefined , undefined ]\nconst trimmed_array = $mol_array_trim(array_with_undefined)"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\array
		 * 	\trim
		 * ```
		 */
		tags() {
			return [
				"array",
				"trim"
			] as readonly any[]
		}
	}
	
}

