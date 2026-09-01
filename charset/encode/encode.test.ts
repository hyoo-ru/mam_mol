namespace $ {
	$mol_test({
		
		'encode empty'() {
			$mol_assert_equal(
				$mol_charset_encode( '' ),
				new Uint8Array( [] ),
			)
		},
		
		'encode 1 octet'() {
			$mol_assert_equal(
				$mol_charset_encode( 'F' ),
				new Uint8Array([ 0x46 ]),
			)
		},
		
		'encode 2 octet'() {
			$mol_assert_equal(
				$mol_charset_encode( 'Б' ),
				new Uint8Array([ 0xd0, 0x91 ]),
			)
		},
		
		'encode 3 octet'() {
			$mol_assert_equal(
				$mol_charset_encode( 'ह' ),
				new Uint8Array([ 0xe0, 0xa4, 0xb9 ]),
			)
		},
		
		'encode 4 octet'() {
			$mol_assert_equal(
				$mol_charset_encode( '𐍈' ),
				new Uint8Array([ 0xf0, 0x90, 0x8d, 0x88 ]),
			)
		},
		
		'encode surrogate pair'() {
			$mol_assert_equal(
				$mol_charset_encode( '😀' ),
				new Uint8Array([ 0xf0, 0x9f, 0x98, 0x80 ]),
			)
		},
		
	})
}
