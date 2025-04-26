namespace $.$$ {
	$mol_test({

		"Zero int"( $ ) {
			$mol_assert_equal(
				$mol_bigint_decode( $mol_bigint_encode( 0n ) ),
				0n,
			)
		},

		"Large positive int"( $ ) {
			$mol_assert_equal(
				$mol_bigint_decode( $mol_bigint_encode( 12345678901234567890n ) ),
				12345678901234567890n,
			)
		},

		"Large negative int"( $ ) {
			$mol_assert_equal(
				$mol_bigint_decode( $mol_bigint_encode( -12345678901234567890n ) ),
				-12345678901234567890n,
			)
		},

	});
}
