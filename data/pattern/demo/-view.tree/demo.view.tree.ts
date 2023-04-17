namespace $ {
	export class $mol_data_pattern_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Birthday = $mol_data_pattern( /^\d{4}-\d{2}-\d{2}$/ )
		 * 	\const birthday = Birthday( '2023-01-06' ) // ✅
		 * 	\
		 * 	\Birthday( '2023-1-6' ) // ❌ 2023-01-06 is not a /^\d{4}-\d{2}-\d{2}$/
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Birthday = $mol_data_pattern( /^\\d{4}-\\d{2}-\\d{2}$/ )\nconst birthday = Birthday( '2023-01-06' ) // ✅\n\nBirthday( '2023-1-6' ) // ❌ 2023-01-06 is not a /^\\d{4}-\\d{2}-\\d{2}$/"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\pattern
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"pattern"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Algorithm/Assert
		 * 	\Type/String
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Type/String"
			] as readonly any[]
		}
	}
	
}

