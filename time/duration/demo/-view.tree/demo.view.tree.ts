namespace $ {
	export class $mol_time_duration_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * title \Time processing library sandbox
		 * ```
		 */
		title() {
			return "Time processing library sandbox"
		}
		
		/**
		 * ```tree
		 * code? \
		 * 	\const week = new $mol_time_duration( 'P7D' )
		 * 	\const days = week.count( 'P1D' )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const week = new $mol_time_duration( 'P7D' )\nconst days = week.count( 'P1D' )"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_time
		 * 	\duraion
		 * ```
		 */
		tags() {
			return [
				"$mol_time",
				"duraion"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Type/Time
		 * ```
		 */
		aspects() {
			return [
				"Type/Time"
			] as readonly any[]
		}
	}
	
}

