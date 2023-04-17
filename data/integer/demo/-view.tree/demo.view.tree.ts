namespace $ {
	export class $mol_data_integer_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Age = $mol_data_integer
		 * 	\const age = Age( 18 ) // ✅
		 * 	\
		 * 	\Age( 18.5 ) // ❌ 18.5 is not an integer
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Age = $mol_data_integer\nconst age = Age( 18 ) // ✅\n\nAge( 18.5 ) // ❌ 18.5 is not an integer"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Algorithm/Assert
		 * 	\Type/Number/Integer
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Type/Number/Integer"
			] as readonly any[]
		}
	}
	
}

