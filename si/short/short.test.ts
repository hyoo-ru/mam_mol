namespace $ {
	$mol_test({
		
		'Special'() {
			$mol_assert_equal( $mol_si_short( 0 ), '0' )
			$mol_assert_equal( $mol_si_short( 1/0 ), '∞' )
			$mol_assert_equal( $mol_si_short( -1/0 ), '-∞' )
			$mol_assert_equal( $mol_si_short( 0/0 ), '∅' )
		},
		
		'M'() {
			$mol_assert_equal( $mol_si_short( 0 ), '0' )
			$mol_assert_equal( $mol_si_short( 0.999500 ), '1.00' )
			$mol_assert_equal( $mol_si_short( -0.999600 ), '-1.00' )
			$mol_assert_equal( $mol_si_short( 999.4 ), '999' )
			$mol_assert_equal( $mol_si_short( -999.4 ), '-999' )
		},
		
		'L'() {
			$mol_assert_equal( $mol_si_short( 999.5 ), '1.00k' )
			$mol_assert_equal( $mol_si_short( -999.5 ), '-1.00k' )
			$mol_assert_equal( $mol_si_short( 999_400 ), '999k' )
			$mol_assert_equal( $mol_si_short( -999_400 ), '-999k' )
		},
		
		'XL'() {
			$mol_assert_equal( $mol_si_short( 999_500 ), '1.00M' )
			$mol_assert_equal( $mol_si_short( -999_600 ), '-1.00M' )
			$mol_assert_equal( $mol_si_short( 999_400_000 ), '999M' )
			$mol_assert_equal( $mol_si_short( -999_400_000 ), '-999M' )
		},
		
		'S'() {
			$mol_assert_equal( $mol_si_short( 0.999400 ), '999m' )
			$mol_assert_equal( $mol_si_short( -0.999400 ), '-999m' )
			$mol_assert_equal( $mol_si_short( 0.000_999_500 ), '1.00m' )
			$mol_assert_equal( $mol_si_short( -0.000_999_500 ), '-1.00m' )
		},
		
		'XS'() {
			$mol_assert_equal( $mol_si_short( 0.000_999_400 ), '999µ' )
			$mol_assert_equal( $mol_si_short( -0.000_999_400 ), '-999µ' )
			$mol_assert_equal( $mol_si_short( 0.000_000_999_600 ), '1.00µ' )
			$mol_assert_equal( $mol_si_short( -0.000_000_999_600 ), '-1.00µ' )
		},
		
		'With unit'() {
			$mol_assert_equal( $mol_si_short( 0, 's' ), '0 s' )
			$mol_assert_equal( $mol_si_short( 1/0, 's' ), '∞ s' )
			$mol_assert_equal( $mol_si_short( 0/0, 's' ), '∅ s' )
			$mol_assert_equal( $mol_si_short( 123, 'Hz' ), '123 Hz' )
			$mol_assert_equal( $mol_si_short( 1234, 'g' ), '1.23 kg' )
		},
		
	})
}
