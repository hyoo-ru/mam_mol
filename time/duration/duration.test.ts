namespace $ {
	$mol_test( {
		
		'parse and serial'() {
			$mol_assert_equal( new $mol_time_duration( 'P42.1Y' ).toString() , 'P42.1YT' )
			$mol_assert_equal( new $mol_time_duration( 'P42.1M' ).toString() , 'P42.1MT' )
			$mol_assert_equal( new $mol_time_duration( 'P42.1D' ).toString() , 'P42.1DT' )
			$mol_assert_equal( new $mol_time_duration( 'PT42.1h' ).toString() , 'PT42.1H' )
			$mol_assert_equal( new $mol_time_duration( 'PT42.1m' ).toString() , 'PT42.1M' )
			$mol_assert_equal( new $mol_time_duration( 'PT42.1s' ).toString() , 'PT42.1S' )
			$mol_assert_equal( new $mol_time_duration( 'P1Y2M3DT4h5m6.7s' ).toString() , 'P1Y2M3DT4H5M6.7S' )
		} ,
		
		'format typed'() {
			$mol_assert_equal(
				new $mol_time_duration( 'P1Y2M3DT4h5m6s' ).toString( 'P#Y#M#DT#h#m#s' ) ,
				'P1Y2M3DT4H5M6S'
			)
		} ,
	
	} )
}
