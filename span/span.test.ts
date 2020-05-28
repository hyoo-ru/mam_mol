namespace $ {
	$mol_test( {
		'creating'( $ ) {
			const span = new $mol_span('test.ts', 1, 3, 4)

			$mol_assert_equal(span.uri, 'test.ts')
			$mol_assert_equal(span.row, 1)
			$mol_assert_equal(span.col, 3)
			$mol_assert_equal(span.length, 4)
		},

		'span for same uri'( $ ) {
			const span = new $mol_span('test.ts', 1, 3, 4)
			const child = span.span(4, 5, 8)

			$mol_assert_equal(child.uri, 'test.ts')
			$mol_assert_equal(child.row, 4)
			$mol_assert_equal(child.col, 5)
			$mol_assert_equal(child.length, 8)
		},

		'span after of given position'( $ ) {
			const col = 3
			const old_len = 4
			const len = 11
			const span = new $mol_span('test.ts', 1, col, old_len)
			const child = span.after(len)

			$mol_assert_equal(child.uri, 'test.ts')
			$mol_assert_equal(child.row, 1)
			$mol_assert_equal(child.col, col + old_len)
			$mol_assert_equal(child.length, len)
		},

		'slice span - regular'( $ ) {
			const span = new $mol_span('test.ts', 1, 3, 5)
			const child = span.slice(1, 3)

			$mol_assert_equal(child.row, 1)
			$mol_assert_equal(child.col, 4)
			$mol_assert_equal(child.length, 3)

			const child2 = span.slice(2)

			$mol_assert_equal(child2.col, 5)
			$mol_assert_equal(child2.length, 3)
		},

		'slice span - out of range'( $ ) {
			const span = new $mol_span('test.ts', 1, 3, 5)

			$mol_assert_fail(() => span.slice(1, 6) )
			$mol_assert_fail(() => span.slice(1, -6) )
			$mol_assert_fail(() => span.slice(-6) )
			$mol_assert_fail(() => span.slice(6) )
		},

		'slice span - relative'( $ ) {
			const span = new $mol_span('test.ts', 1, 3, 5)
			const child = span.slice(-1)

			$mol_assert_equal(child.col, 7)
			$mol_assert_equal(child.length, 1)

			const child2 = span.slice(0, -1)

			$mol_assert_equal(child2.col, 3)
			$mol_assert_equal(child2.length, 4)
		},

		'error handling'( $ ) {
			const span = new $mol_span('test.ts', 1, 3, 4)
			const error = span.error('some error')

			$mol_assert_equal(error.message, 'some error\ntest.ts#1:3-4')
		}

	} )
}
