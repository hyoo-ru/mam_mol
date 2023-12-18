namespace $ {
	$mol_test( {
		'span for same uri'( $ ) {
			const span = new $mol_span('test.ts', '', 1, 3, 4)
			const child = span.span(4, 5, 8)

			$mol_assert_equal(child.uri, 'test.ts')
			$mol_assert_equal(child.row, 4)
			$mol_assert_equal(child.col, 5)
			$mol_assert_equal(child.length, 8)
		},

		'span after of given position'( $ ) {
			const span = new $mol_span('test.ts', '', 1, 3, 4)
			const child = span.after(11)

			$mol_assert_equal(child.uri, 'test.ts')
			$mol_assert_equal(child.row, 1)
			$mol_assert_equal(child.col, 7)
			$mol_assert_equal(child.length, 11)
		},

		'slice span - regular'( $ ) {
			const span = new $mol_span('test.ts', '', 1, 3, 5)
			const child = span.slice(1, 4)

			$mol_assert_equal(child.row, 1)
			$mol_assert_equal(child.col, 4)
			$mol_assert_equal(child.length, 3)

			const child2 = span.slice(2, 2)

			$mol_assert_equal(child2.col, 5)
			$mol_assert_equal(child2.length, 0)
		},

		'slice span - negative'( $ ) {
			const span = new $mol_span('test.ts', '', 1, 3, 5)
			const child = span.slice(-3, -1)

			$mol_assert_equal(child.row, 1)
			$mol_assert_equal(child.col, 5)
			$mol_assert_equal(child.length, 2)
		},

		'slice span - out of range'( $ ) {
			const span = new $mol_span('test.ts', '', 1, 3, 5)

			$mol_assert_fail( ()=> span.slice(-1, 3), `End value '3' can't be less than begin value (test.ts#1:3/5)` )
			$mol_assert_fail( ()=> span.slice(1, 6), `End value '6' out of range (test.ts#1:3/5)` )
			$mol_assert_fail( ()=> span.slice(1, 10), `End value '10' out of range (test.ts#1:3/5)` )
		},

		'error handling'( $ ) {
			const span = new $mol_span('test.ts', '', 1, 3, 4)
			const error = span.error('Some error')

			$mol_assert_equal(error.message, 'Some error (test.ts#1:3/4)')
		}

	} )
}
