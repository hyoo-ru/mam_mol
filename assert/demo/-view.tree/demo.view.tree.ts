namespace $ {
	export class $mol_assert_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\$mol_assert_unique( 1 , 2 , 3 )
		 * 	\$mol_assert_equal( 1 , 1 , 1 )
		 * 	\$mol_assert_like( [1] , [1] , [1] )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "$mol_assert_unique( 1 , 2 , 3 )\n$mol_assert_equal( 1 , 1 , 1 )\n$mol_assert_like( [1] , [1] , [1] )"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\testing
		 * 	\jest
		 * 	\assert
		 * 	\mocha
		 * 	\chai
		 * 	\unit
		 * ```
		 */
		tags() {
			return [
				"testing",
				"jest",
				"assert",
				"mocha",
				"chai",
				"unit"
			] as readonly any[]
		}
	}
	
}

