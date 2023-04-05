namespace $ {
	export class $mol_array_demo_lottery extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const some_array = [1,2,3,4,5,6,7,8,9]
		 * 	\const random_item = $mol_array_lottery(some_array)
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const some_array = [1,2,3,4,5,6,7,8,9]\nconst random_item = $mol_array_lottery(some_array)"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\array
		 * 	\random
		 * ```
		 */
		tags() {
			return [
				"array",
				"random"
			] as readonly any[]
		}
	}
	
}

