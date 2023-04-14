namespace $ {
	export class $mol_data_number_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Pos = $mol_data_number
		 * 	\const pos = Pos( 1.25 ) // ✅
		 * 	\
		 * 	\Pos( 'xxx' ) // ❌ xxx is not a number
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Pos = $mol_data_number\nconst pos = Pos( 1.25 ) // ✅\n\nPos( 'xxx' ) // ❌ xxx is not a number"
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
		 * 	\Type/Number
		 * ```
		 */
		aspects() {
			return [
				"Assert",
				"Type/Number"
			] as readonly any[]
		}
	}
	
}

