namespace $ {
	export class $mol_data_variant_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Phone = $mol_data_variant(
		 * 	\	$mol_data_number,
		 * 	\	$mol_data_string,
		 * 	\)
		 * 	\const phone1 = Phone( 1234567890 ) // ✅
		 * 	\const phone2 = Phone( '+1(23)456-78-90' ) // ✅
		 * 	\
		 * 	\Phone( null )
		 * 	\// ❌ null is not any of variants
		 * 	\// ❌ null is not a number
		 * 	\// ❌ null is not a string
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Phone = $mol_data_variant(\n\t$mol_data_number,\n\t$mol_data_string,\n)\nconst phone1 = Phone( 1234567890 ) // ✅\nconst phone2 = Phone( '+1(23)456-78-90' ) // ✅\n\nPhone( null )\n// ❌ null is not any of variants\n// ❌ null is not a number\n// ❌ null is not a string"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\variant
		 * 	\adt
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"variant",
				"adt"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Assert
		 * ```
		 */
		aspects() {
			return [
				"Assert"
			] as readonly any[]
		}
	}
	
}

