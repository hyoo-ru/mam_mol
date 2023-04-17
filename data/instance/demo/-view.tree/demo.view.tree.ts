namespace $ {
	export class $mol_data_instance_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Created = $mol_data_instance( Date )
		 * 	\const created = Created( new Date ) // ✅
		 * 	\
		 * 	\Created( '2023-01-01' ) // ❌ 2023-01-01 is not a Date
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Created = $mol_data_instance( Date )\nconst created = Created( new Date ) // ✅\n\nCreated( '2023-01-01' ) // ❌ 2023-01-01 is not a Date"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\instance
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"instance"
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

