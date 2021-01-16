namespace $ {
	$mol_test({

		'min'() {
			$mol_assert_equal( $mol_vlq_encode( Number.MIN_SAFE_INTEGER ), '//////H' )
		},

		'negative'() {
			$mol_assert_equal( $mol_vlq_encode( -1 ), 'D' )
		},

		'zero'() {
			$mol_assert_equal( $mol_vlq_encode( 0 ), 'A' )
		},

		'binom'() {
			$mol_assert_equal( $mol_vlq_encode( 67 ), 'mE' )
		},

		'max'() {
			$mol_assert_equal( $mol_vlq_encode( Number.MAX_SAFE_INTEGER ), '+/////H' )
		},

	})
}
