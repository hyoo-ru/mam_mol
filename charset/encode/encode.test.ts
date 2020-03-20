namespace $ {
	$mol_test({
		'encode utf8 string'() {
			const str = 'Hello, ΧΨΩЫ'
			const encoded = new Uint8Array( [ 72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171 ] )

			$mol_assert_like( $mol_charset_encode(str), encoded )
		},
	})
}
