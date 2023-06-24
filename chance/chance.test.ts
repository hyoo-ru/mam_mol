namespace $ {

	$mol_test({

		'Probability should not be negative'() {

			$mol_assert_fail( ()=> {

				$mol_chance(
					[ 50, 1 ],
					[ -10, 2 ],
					[ 50, 3 ],
				)

			} )

		},

		'Probability sum should not be more than 100'() {

			$mol_assert_fail( ()=> {

				$mol_chance(
					[ 50, 1 ],
					[ 50, 2 ],
					[ 1, 3 ],
				)

			} )

		},

		'Probability sum should not be less than 100'() {

			$mol_assert_fail( ()=> {

				$mol_chance(
					[ 50, 1 ],
					[ 30, 2 ],
					[ 10, 3 ],
				)

			} )

		},

		"Result should be one of chance values"() {

			const result = $mol_chance(
				[ 10, 1 ],
				[ 10, 2 ],
				[ 40, 3 ],
				[ 30, 4 ],
				[ 10, 5 ],
			)

			$mol_assert_ok(
				result === 1
				|| result === 2
				|| result === 3
				|| result === 4
				|| result === 5
			)

		},

		"100 percent chance's value should be returned every time"() {

			var match_count = 0
			for ( var i = 0; i < 500; ++ i ) {

				const result = $mol_chance( [ 100, 0 ] )

				if ( result === 0 ) match_count += 1

			}

			$mol_assert_equal( match_count, 500 )

		},

		"0 percent chances's value should never be returned"() {

			var match_count = 0
			for ( var i = 0; i < 500; ++ i ) {

				const result = $mol_chance(
					[ 60, 60 ],
					[ 0, 0 ],
					[ 40, 40 ],
				)

				if ( result === 0 ) match_count += 1

			}

			$mol_assert_equal( match_count, 0 )

		},

		"Chance value sholud be called if it is a function"() {

			const result = $mol_chance(
				[ 100, ()=> ( { prop: false } ) ]
			)

			$mol_assert_like( result, { prop: false } )

		},

		"Correct type inference"() {

			const result = $mol_chance(
				[ 10, 1 ],
				[ 20, ()=> 'str' ],
				[ 30, false ],
				[ 40, ()=> ( { a: 1, b: true } ) ]
			)

			type Result = typeof result

			type Check = $mol_type_assert<
				Result,
				number | 'str' | boolean | { a: number, b: boolean }
			>

		},

	})

}
