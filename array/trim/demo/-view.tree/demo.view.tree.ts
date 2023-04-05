namespace $ {
	export class $mol_array_trim_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const res = $mol_array_trim([
		 * 	\	undefined,
		 * 	\	null,
		 * 	\	0,
		 * 	\	false,
		 * 	\	null,
		 * 	\	undefined,
		 * 	\	undefined,
		 * 	\])
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const res = $mol_array_trim([\n\tundefined,\n\tnull,\n\t0,\n\tfalse,\n\tnull,\n\tundefined,\n\tundefined,\n])"
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

