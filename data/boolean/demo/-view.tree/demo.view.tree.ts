namespace $ {
	export class $mol_data_boolean_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const IsAdult = $mol_data_boolean
		 * 	\const isAdult = IsAdult( false ) // ✅
		 * 	\
		 * 	\IsAdult( 0 ) // ❌ 0 is not a boolean
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const IsAdult = $mol_data_boolean\nconst isAdult = IsAdult( false ) // ✅\n\nIsAdult( 0 ) // ❌ 0 is not a boolean"
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
		 * 	\Type/Boolean
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Type/Boolean"
			] as readonly any[]
		}
	}
	
}

