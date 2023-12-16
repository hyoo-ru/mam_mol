namespace $ {
	export class $mol_assert_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\$mol_assert_unique( [1], [2], [3] )
		 * 	\$mol_assert_equal( [7] , [7], [7] )
		 * 	\$mol_assert_fail( ()=> { throw Error( 'test' ) }, 'test' )
		 * 	\$mol_assert_fail( ()=> { throw RangeError( 'test' ) }, RangeError )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "$mol_assert_unique( [1], [2], [3] )\n$mol_assert_equal( [7] , [7], [7] )\n$mol_assert_fail( ()=> { throw Error( 'test' ) }, 'test' )\n$mol_assert_fail( ()=> { throw RangeError( 'test' ) }, RangeError )"
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Algorithm/Assert
		 * 	\Testing
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Testing"
			] as readonly any[]
		}
	}
	
}

