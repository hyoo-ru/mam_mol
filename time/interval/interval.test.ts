namespace $ {
	$mol_test({
		
		'triplets'() {
			$mol_assert_equal(
				new $mol_time_interval( '2015-01-01/P1M' ).end.toString() ,
				'2015-02-01'
			)
			$mol_assert_equal(
				new $mol_time_interval( 'P1M/2015-02-01' ).start.toString() ,
				'2015-01-01'
			)
			$mol_assert_equal(
				new $mol_time_interval( '2015-01-01/2015-02-01' ).duration.toString() ,
				'PT2678400S'
			)
		}
		
	})
}
