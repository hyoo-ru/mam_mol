namespace $ {
	export class $mol_data_string_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Name = $mol_data_string
		 * 	\const name = Name( 'Jin' ) // ✅
		 * 	\
		 * 	\Name( 7 ) // ❌ 7 is not a string
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Name = $mol_data_string\nconst name = Name( 'Jin' ) // ✅\n\nName( 7 ) // ❌ 7 is not a string"
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
		 * 	\Assert
		 * 	\Type/String
		 * ```
		 */
		aspects() {
			return [
				"Assert",
				"Type/String"
			] as readonly any[]
		}
	}
	
}

