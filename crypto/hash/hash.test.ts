namespace $ {
	$mol_test({
		
		'empty hash'() {
			$mol_assert_equal(
				$mol_crypto_hash( new Uint8Array([]) ),
				new Uint8Array([ 218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9 ]),
			)
		},
		
		'three bytes hash'() {
			$mol_assert_equal(
				$mol_crypto_hash( new Uint8Array([ 255, 254, 253 ]) ),
				new Uint8Array([ 240, 150, 38, 243, 255, 128, 96, 0, 72, 215, 207, 228, 19, 149, 113, 52, 2, 125, 27, 77 ]),
			)
		},
		
		'six bytes hash'() {
			$mol_assert_equal(
				$mol_crypto_hash( new Uint8Array([ 0, 255, 10, 250, 32, 128 ]) ),
				new Uint8Array([ 23, 25, 155, 181, 46, 200, 221, 83, 254, 0, 166, 68, 91, 255, 67, 140, 114, 88, 218, 155 ]),
			)
		},
		
		'seven bytes hash'() {
			$mol_assert_equal(
				$mol_crypto_hash( new Uint8Array([ 1, 2, 3, 4, 5, 6, 7 ]) ),
				new Uint8Array([ 140, 31, 40, 252, 47, 72, 194, 113, 214, 196, 152, 240, 242, 73, 205, 222, 54, 92, 84, 197 ]),
			)
		},
		
		async 'reference'() {
			const data = new Uint8Array([255,254,253])
			$mol_assert_equal(
				$mol_crypto_hash(data),
				new Uint8Array( await $mol_crypto_native.subtle.digest( 'SHA-1', data ) ),
			)
		},
		
	})
}
