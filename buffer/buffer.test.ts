namespace $ {
	$mol_test({
		'buffer from utf8 string'() {
			const str = 'Hello, ΧΨΩЫ'
			const buffer = $mol_buffer.from(str)

			$mol_assert_equal( buffer.toString(), str )
		},

		'buffer length equals binary string length'() {
			const str = 'Hello, ΧΨΩЫ'
			const buffer = $mol_buffer.from(str)

			$mol_assert_equal( buffer.length, 15 )
		},

		'buffer base64 encode'() {
			const str = 'Hello, ΧΨΩЫ'
			const buffer = $mol_buffer.from(str)

			$mol_assert_equal( buffer.toString('base64'), 'SGVsbG8sIM6nzqjOqdCr' )
		},

		'buffer base64 decode'() {
			const str = 'GgoASUh42g=='
			const buffer = $mol_buffer.from(str, 'base64')

			$mol_assert_like( buffer.original, new Uint8Array([26,10,0,73,72,120,218]))
		},
	})
}
