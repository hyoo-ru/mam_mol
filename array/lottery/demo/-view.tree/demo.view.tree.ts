namespace $ {
	export class $mol_array_lottery_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const rates = [ 1, 2, 3, 4, 5 ]
		 * 	\const vote = $mol_array_lottery( rates )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const rates = [ 1, 2, 3, 4, 5 ]\nconst vote = $mol_array_lottery( rates )"
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Type/List
		 * 	\Algorithm/Random
		 * ```
		 */
		aspects() {
			return [
				"Type/List",
				"Algorithm/Random"
			] as readonly any[]
		}
	}
	
}

