namespace $ {
	export class $mol_time_moment_demo extends $mol_example_code {
		
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
		 * 	\const now = new $mol_time_moment
		 * 	\const today = now.toString( 'YYYY-MM-DD' )
		 * 	\const tomorrow = now.shift( 'P1D' ).toString( 'DD Mon' )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const now = new $mol_time_moment\nconst today = now.toString( 'YYYY-MM-DD' )\nconst tomorrow = now.shift( 'P1D' ).toString( 'DD Mon' )"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_time
		 * 	\moment
		 * ```
		 */
		tags() {
			return [
				"$mol_time",
				"moment"
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

