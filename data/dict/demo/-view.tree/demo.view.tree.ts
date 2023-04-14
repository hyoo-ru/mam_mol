namespace $ {
	export class $mol_data_dict_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Names = $mol_data_dict( $mol_data_string )
		 * 	\const names = Names({ jin: 'Jin', john: 'John' }) // ✅
		 * 	\
		 * 	\Names({ jin: 'Jin', john: 5 }) // ❌ ["john"] 5 is not a string
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Names = $mol_data_dict( $mol_data_string )\nconst names = Names({ jin: 'Jin', john: 'John' }) // ✅\n\nNames({ jin: 'Jin', john: 5 }) // ❌ [\"john\"] 5 is not a string"
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
		 * 	\Type/Dictionary
		 * ```
		 */
		aspects() {
			return [
				"Assert",
				"Type/Dictionary"
			] as readonly any[]
		}
	}
	
}

