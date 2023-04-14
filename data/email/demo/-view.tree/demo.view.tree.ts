namespace $ {
	export class $mol_data_email_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const From = $mol_data_email
		 * 	\const from = From( 'jin@example.org' ) // ✅
		 * 	\
		 * 	\From( 'jin' ) // ❌ jin is not a /.+@.+/
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const From = $mol_data_email\nconst from = From( 'jin@example.org' ) // ✅\n\nFrom( 'jin' ) // ❌ jin is not a /.+@.+/"
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
		 * 	\Type/Email
		 * ```
		 */
		aspects() {
			return [
				"Assert",
				"Type/Email"
			] as readonly any[]
		}
	}
	
}

