namespace $.$$ {
	$mol_test({
		
		"1 byte int"( $ ) {
			
			$mol_assert_equal(
				$mol_bigint_encode( 0n ),
				new Uint8Array( new Int8Array([ 0 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( 1n ),
				new Uint8Array( new Int8Array([ 1 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -1n ),
				new Uint8Array( new Int8Array([ -1 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( 127n ),
				new Uint8Array( new Int8Array([ 127 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -128n ),
				new Uint8Array( new Int8Array([ -128 ]).buffer ),
			)
			
		},
		
		"2 byte int"( $ ) {
			
			$mol_assert_equal(
				$mol_bigint_encode( 128n ),
				new Uint8Array( new Int16Array([ 128 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -129n ),
				new Uint8Array( new Int16Array([ -129 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( 128n * 256n - 1n ),
				new Uint8Array( new Int16Array([ 128 * 256 - 1 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -128n * 256n ),
				new Uint8Array( new Int16Array([ -128 * 256 ]).buffer ),
			)
			
		},
		
		"3 byte int"( $ ) {
			
			$mol_assert_equal(
				$mol_bigint_encode( 128n * 256n ),
				new Uint8Array( new Int32Array([ 128 * 256 ]).buffer ).slice( 0, 3 ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -128n * 256n - 1n ),
				new Uint8Array( new Int32Array([ -128 * 256 - 1 ]).buffer ).slice( 0, 3 ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( 128n * 256n ** 2n - 1n ),
				new Uint8Array( new Int32Array([ 128 * 256 ** 2 - 1 ]).buffer ).slice( 0, 3 ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -128n * 256n ** 2n ),
				new Uint8Array( new Int32Array([ -128 * 256 ** 2 ]).buffer ).slice( 0, 3 ),
			)
			
		},
		
		"4 byte int"( $ ) {
			
			$mol_assert_equal(
				$mol_bigint_encode( 128n * 256n ** 2n ),
				new Uint8Array( new Int32Array([ 128 * 256 ** 2 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -128n * 256n ** 2n - 1n ),
				new Uint8Array( new Int32Array([ -128 * 256 ** 2 - 1 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( 128n * 256n ** 3n - 1n ),
				new Uint8Array( new Int32Array([ 128 * 256 ** 3 - 1 ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -128n * 256n ** 3n ),
				new Uint8Array( new Int32Array([ -128 * 256 ** 3 ]).buffer ),
			)
			
		},
		
		"8 byte int"( $ ) {
			
			$mol_assert_equal(
				$mol_bigint_encode( 128n * 256n ** 7n - 1n ),
				new Uint8Array( new BigInt64Array([ 128n * 256n ** 7n - 1n ]).buffer ),
			)
			
			$mol_assert_equal(
				$mol_bigint_encode( -128n * 256n ** 7n ),
				new Uint8Array( new BigInt64Array([ -128n * 256n ** 7n ]).buffer ),
			)
			
		},
		
	})
}
