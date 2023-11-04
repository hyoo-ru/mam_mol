namespace $ {
	export class $mol_assert_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\$mol_assert_unique( 1 , 2 , 3 )
		 * 	\$mol_assert_equal( 1 , 1 , 1 )
		 * 	\$mol_assert_like( [1] , [1] , [1] )
		 * 	\$mol_assert_like( { a: 1 } , { a: 1 } , { a: 1 } )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "$mol_assert_unique( 1 , 2 , 3 )\n$mol_assert_equal( 1 , 1 , 1 )\n$mol_assert_like( [1] , [1] , [1] )\n$mol_assert_like( { a: 1 } , { a: 1 } , { a: 1 } )"
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

