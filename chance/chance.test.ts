namespace $ {

	$mol_test({

		'Probability should not be negative'() {

			$mol_assert_fail( ()=> {

				$mol_chance(
					[ 50, ()=> 1 ],
					[ -10, ()=> 2 ],
					[ 50, ()=> 3 ],
				)

			} )

		},

		'Result should be one of chance`s fn return values'() {

			const result = $mol_chance(
				[ 10, ()=> 1 ],
				[ 10, ()=> 2 ],
				[ 40, ()=> 3 ],
				[ 30, ()=> 4 ],
				[ 10, ()=> 5 ],
			)

			$mol_assert_ok(
				result === 1
				|| result === 2
				|| result === 3
				|| result === 4
				|| result === 5
			)

		},

		'Chance value sholud be called if it is a function'() {

			const result = $mol_chance(
				[ 1, ()=> ( { prop: false } ) ]
			)

			$mol_assert_like( result, { prop: false } )

		},

		'Correct type inference'() {

			const result = $mol_chance(
				[ 10, ()=> 1 ],
				[ 20, ()=> 'str' ],
				[ 30, ()=> false ],
				[ 40, ()=> ( { a: 1, b: true } ) ]
			)

			type Result = typeof result

			type Check = $mol_type_assert<
				Result,
				number | string | boolean | { a: number, b: boolean }
			>

		},

	})

}
