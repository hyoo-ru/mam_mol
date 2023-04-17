namespace $ {
	export class $mol_data_range_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Portion = $mol_data_range( 0, 1 )
		 * 	\const portion = Portion( 0.5 ) // ✅
		 * 	\
		 * 	\Portion( 0 ) // ❌ 0 is out range (0,1)
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Portion = $mol_data_range( 0, 1 )\nconst portion = Portion( 0.5 ) // ✅\n\nPortion( 0 ) // ❌ 0 is out range (0,1)"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\range
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"range"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Algorithm/Assert
		 * 	\Type/Number
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Type/Number"
			] as readonly any[]
		}
	}
	
}

