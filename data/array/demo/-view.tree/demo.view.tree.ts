namespace $ {
	export class $mol_data_array_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Samples = $mol_data_array( $mol_data_number )
		 * 	\const samples = Samples( [ 1, 2, 3, 4, 5 ] ) // ✅
		 * 	\
		 * 	\Samples([ 1, 'foo' ]) // ❌ [1] foo is not a number
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Samples = $mol_data_array( $mol_data_number )\nconst samples = Samples( [ 1, 2, 3, 4, 5 ] ) // ✅\n\nSamples([ 1, 'foo' ]) // ❌ [1] foo is not a number"
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
		 * 	\Type/List
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Type/List"
			] as readonly any[]
		}
	}
	
}

