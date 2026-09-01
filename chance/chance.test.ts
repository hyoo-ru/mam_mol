namespace $ {

	$mol_test({

		'Probability should be a number'() {

			$mol_assert_fail(
				()=> $mol_chance(
					[ 50, ()=> 1 ],
					[ NaN, ()=> 2 ],
				),
				'Incorrect probability value: NaN, but only positive numbers are allowed',
			)

		},

		'Probability should not be negative'() {

			$mol_assert_fail(
				()=> $mol_chance(
					[ 50, ()=> 1 ],
					[ -10, ()=> 2 ],
					[ 50, ()=> 3 ],
				),
				'Incorrect probability value: -10, but only positive numbers are allowed'
			)

		},

		'Result should be one of chance`s fn return values'() {

			const result = $mol_chance(
				[ 10, ()=> 1 ],
				[ 10, ()=> 2 ],
				[ 40, ()=> 3 ],
				[ 30, ()=> 4 ],
				[ 10, ()=> 5 ],
			)

			$mol_assert_equal( true,
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

			$mol_assert_equal( result, { prop: false } )

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
