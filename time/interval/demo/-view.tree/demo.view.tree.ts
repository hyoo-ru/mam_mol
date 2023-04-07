namespace $ {
	export class $mol_time_interval_demo extends $mol_example_code {
		
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
		 * 	\const nextYear = new $mol_time_interval( '/P1Y' )
		 * 	\const anniversary = nextYear.end.toString( 'YYYY-MM-DD hh:mm' )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const nextYear = new $mol_time_interval( '/P1Y' )\nconst anniversary = nextYear.end.toString( 'YYYY-MM-DD hh:mm' )"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_time
		 * 	\interval
		 * ```
		 */
		tags() {
			return [
				"$mol_time",
				"interval"
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

