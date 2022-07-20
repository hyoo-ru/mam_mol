namespace $ {
	$mol_test({
		
		'empty hash'() {
			$mol_assert_like(
				$mol_crypto_hash( new Uint8Array([]) ),
				new Uint8Array([ 218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9 ]),
			)
		},
		
		'seven bytes hash'() {
			$mol_assert_like(
				$mol_crypto_hash( new Uint8Array([ 1, 2, 3, 4, 5, 6, 7 ]) ),
				new Uint8Array([ 140, 31, 40, 252, 47, 72, 194, 113, 214, 196, 152, 240, 242, 73, 205, 222, 54, 92, 84, 197 ]),
			)
		},
		
		// async 'reference'() {
		// 	const data = new Uint8Array([255,254,253])
		// 	const left = $mol_crypto_hash(data)
		// 	const right = new Uint8Array(await crypto.subtle.digest('SHA-1', data))
		// 	console.log( left, right, $mol_compare_deep( left, right ) )
		// },
		
	})
}
