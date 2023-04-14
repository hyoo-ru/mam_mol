namespace $ {
	export class $mol_data_const_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const OK = $mol_data_const({ done: true })
		 * 	\const ok = OK({ done: true }) // ✅
		 * 	\
		 * 	\OK({ done: false }) // ❌ {"done":false} is not {"done":true}
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const OK = $mol_data_const({ done: true })\nconst ok = OK({ done: true }) // ✅\n\nOK({ done: false }) // ❌ {\"done\":false} is not {\"done\":true}"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\equals
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"equals"
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

