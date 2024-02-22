namespace $ {
	$mol_test({
		
		'add cause to error'() {
			const err = new Error('foo', { cause: 'foo' })
			const err2 = $mol_error_improve(err, { meta: 'bar' })

			$mol_assert_equal(err2.message, 'foo')
			$mol_assert_equal(err2.cause, [ 'foo', { meta: 'bar' } ])
		},

		'hierarchical cause'() {
			const err = new Error('foo', { cause: 'foo' })
			const err2 = $mol_error_improve(err, 'bar')
			const err3 = $mol_error_improve(err2, 'baz')

			$mol_assert_equal(err3.cause, [ 'foo', 'bar', 'baz' ])
		},

		'hierarchical cause 2'() {
			const err = new Error('err1', { cause: 'foo' })
			const err2 = $mol_error_improve(err, 'bar')
			const err3 = $mol_error_improve(err2, 'baz')
			const err4 = $mol_error_improve(new TypeError('oops', { cause: [ err3 ]}), 'bal')

			$mol_assert_equal(err4.cause, [ 'foo', 'bar', 'baz', 'bal' ])
		},
	})
}
