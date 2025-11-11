namespace $ {
	$mol_test({
		
		'encode empty'() {
			$mol_assert_equal(
				$mol_charset_decode_from( new Uint8Array( [] ), 0, 0 ),
				[ '', 0 ],
			)
		},
		
		'encode 1 octet'() {
			$mol_assert_equal(
				$mol_charset_decode_from( new Uint8Array([ 0x46 ]), 0, 1 ),
				[ 'F', 1 ],
			)
		},
		
		'encode 2 octet'() {
			$mol_assert_equal(
				$mol_charset_decode_from( new Uint8Array([ 0xd0, 0x91 ]), 0, 1 ),
				[ 'Б', 2 ],
			)
		},
		
		'encode 3 octet'() {
			$mol_assert_equal(
				$mol_charset_decode_from( new Uint8Array([ 0xe0, 0xa4, 0xb9 ]), 0, 1 ),
				[ 'ह', 3 ],
			)
		},
		
		'encode 4 octet'() {
			$mol_assert_equal(
				$mol_charset_decode_from( new Uint8Array([ 0xf0, 0x90, 0x8d, 0x88 ]), 0, 1 ),
				[ '𐍈', 4 ],
			)
		},
		
		'encode surrogate pair'() {
			$mol_assert_equal(
				$mol_charset_decode_from( new Uint8Array([ 0xf0, 0x9f, 0x98, 0x80 ]), 0, 2),
				[ '😀', 4 ],
			)
		},
		
	})
}
