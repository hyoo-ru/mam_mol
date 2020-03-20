namespace $ {
	$mol_test({
		'decode utf8 string'() {
			const str = 'Hello, ΧΨΩЫ'
			const encoded = new Uint8Array( [ 72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171 ] )

			$mol_assert_equal( $mol_charset_decode(encoded), str )
			$mol_assert_equal( $mol_charset_decode(encoded, 'utf8'), str )
		},

		'decode empty string'() {
			const encoded = new Uint8Array( [] )

			$mol_assert_equal( $mol_charset_decode(encoded), '' )
		},
	})
}
