namespace $ {
	export class $mol_data_pipe_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Birthday = $mol_data_pipe(
		 * 	\	$mol_data_string,
		 * 	\	$mol_time_moment,
		 * 	\	( moment: $mol_time_moment )=> moment.toOffset( 'Z' ),
		 * 	\)
		 * 	\const birthday = Birthday( '2023-01-06' ) // ✅
		 * 	\
		 * 	\Birthday( 123 ) // ❌ 2023-01-06 is not a number
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Birthday = $mol_data_pipe(\n\t$mol_data_string,\n\t$mol_time_moment,\n\t( moment: $mol_time_moment )=> moment.toOffset( 'Z' ),\n)\nconst birthday = Birthday( '2023-01-06' ) // ✅\n\nBirthday( 123 ) // ❌ 2023-01-06 is not a number"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\pipe
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"pipe"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Algorithm/Assert
		 * 	\Algorithm/Compose
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Algorithm/Compose"
			] as readonly any[]
		}
	}
	
}

