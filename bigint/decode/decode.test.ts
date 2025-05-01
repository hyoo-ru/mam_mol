namespace $.$$ {
	$mol_test({
		
		"1 byte int"( $ ) {
			
			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array ),
				0n,
			)
			
			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int8Array([ 1 ]).buffer ) ),
				1n,
			)
			
			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int8Array([ -1 ]).buffer ) ),
				-1n,
			)
			
			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int8Array([ 127 ]).buffer ) ),
				127n,
			)
			
			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int8Array([ -128 ]).buffer ) ),
				-128n,
			)

		},
		
		"2 byte int"( $ ) {

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int16Array([ 128 ]).buffer ) ),
				128n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int16Array([ -129 ]).buffer ) ),
				-129n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int16Array([ 128 * 256 - 1 ]).buffer ) ),
				128n * 256n - 1n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int16Array([ -128 * 256 ]).buffer ) ),
				-128n * 256n,
			)

		},

		"3 byte int"( $ ) {

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ 128 * 256 ]).buffer ).slice( 0, 3 ) ),
				128n * 256n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ -128 * 256 - 1 ]).buffer ).slice( 0, 3 ) ),
				-128n * 256n - 1n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ 128 * 256 ** 2 - 1 ]).buffer ).slice( 0, 3 ) ),
				128n * 256n ** 2n - 1n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ -128 * 256 ** 2 ]).buffer ).slice( 0, 3 ) ),
				-128n * 256n ** 2n,
			)

		},

		"4 byte int"( $ ) {

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ 128 * 256 ** 2 ]).buffer ) ),
				128n * 256n ** 2n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ -128 * 256 ** 2 - 1 ]).buffer ) ),
				-128n * 256n ** 2n - 1n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ 128 * 256 ** 3 - 1 ]).buffer ) ),
				128n * 256n ** 3n - 1n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new Int32Array([ -128 * 256 ** 3 ]).buffer ) ),
				-128n * 256n ** 3n,
			)

		},

		"8 byte int"( $ ) {

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new BigInt64Array([ 128n * 256n ** 7n - 1n ]).buffer ) ),
				128n * 256n ** 7n - 1n,
			)

			$mol_assert_equal(
				$mol_bigint_decode( new Uint8Array( new BigInt64Array([ -128n * 256n ** 7n ]).buffer ) ),
				-128n * 256n ** 7n,
			)

		},

	})
}
