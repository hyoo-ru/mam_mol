namespace $ {
	export class $mol_data_nullable_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Age = $mol_data_nullable( $mol_data_integer )
		 * 	\const age1 = Age( 18 ) // ✅
		 * 	\const age2 = Age( null ) // ✅
		 * 	\
		 * 	\Age( 'xxx' ) // ❌ xxx is not a number
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Age = $mol_data_nullable( $mol_data_integer )\nconst age1 = Age( 18 ) // ✅\nconst age2 = Age( null ) // ✅\n\nAge( 'xxx' ) // ❌ xxx is not a number"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\nullable
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"nullable"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Algorithm/Assert
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert"
			] as readonly any[]
		}
	}
	
}

