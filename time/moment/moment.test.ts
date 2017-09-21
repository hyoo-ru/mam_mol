namespace $ {
	$mol_test( {
		
		'parse and serial'() {
			$mol_assert_equal( new $mol_time_moment( '2014' ).toString() , '2014' )
			$mol_assert_equal( new $mol_time_moment( '2014-01' ).toString() , '2014-01' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02' ).toString() , '2014-01-02' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03' ).toString() , '2014-01-02T03' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03:04' ).toString() , '2014-01-02T03:04' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03:04:05' ).toString() , '2014-01-02T03:04:05' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03:04:05.006' ).toString() , '2014-01-02T03:04:05.006' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03:04:05.006Z' ).toString() , '2014-01-02T03:04:05.006+00:00' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03:04:05.006+07:00' ).toString() , '2014-01-02T03:04:05.006+07:00' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03:04:05+07:08' ).toString() , '2014-01-02T03:04:05+07:08' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02T03:04+07:08' ).toString() , '2014-01-02T03:04+07:08' )
			$mol_assert_equal( new $mol_time_moment( 'T03:04+07:08' ).toString() , 'T03:04+07:08' )
			$mol_assert_equal( new $mol_time_moment( 'T03:04:05' ).toString() , 'T03:04:05' )
			$mol_assert_equal( new $mol_time_moment( 'T03:04' ).toString() , 'T03:04' )
			$mol_assert_equal( new $mol_time_moment( 'T03' ).toString() , 'T03' )
		} ,
		
		'format simple'() {
			$mol_assert_equal(
				new $mol_time_moment( '2014-01-02T01:02:03.000' ).toString( 'AD YY-M-D h:m:s' ) ,
				'21 14-1-2 1:2:3'
			)
		} ,
		
		'format padded'() {
			$mol_assert_equal(
				new $mol_time_moment( '2014-01-02T01:02:03.000' ).toString( 'YYYY-MM-DD hh:mm:ss' ) ,
				'2014-01-02 01:02:03'
			)
		} ,
		
		'format time zone'() {
			$mol_assert_equal(
				new $mol_time_moment( '2014-01-02T01:02:03+05:00' ).toString( 'Z' ) ,
				'+05:00'
			)
		} ,
		
		'format names'() {
			$mol_assert_ok(
				new $mol_time_moment( '2014-01-02T01:02:03.000' ).toString( 'Month Mon | WeekDay WD' )
			)
		} ,
		
		'shifting'() {
			$mol_assert_equal( new $mol_time_moment( 'T15:54:58.243+03:00' ).shift( {} ).toString() , 'T15:54:58.243+03:00' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02' ).shift( 'P1Y' ).toString() , '2015-01-02' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02' ).shift( 'P12M' ).toString() , '2015-01-02' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02' ).shift( 'P365D' ).toString() , '2015-01-02' )
			$mol_assert_equal( new $mol_time_moment( '2014-01-02' ).shift( 'PT8760h' ).toString() , '2015-01-02' )
			$mol_assert_equal( new $mol_time_moment( '2014-01' ).shift( 'PT8760h' ).toString() , '2015-01' )
			$mol_assert_equal( new $mol_time_moment( '2014-01' ).shift( 'PT-8760h' ).toString() , '2013-01' )
		} ,
		
		'normalization'() {
			$mol_assert_equal(
				new $mol_time_moment( '2015-07-35' ).normal.toString() ,
				'2015-08-04'
			)
		} , 
	
		'iso week day'() {
			$mol_assert_equal( new $mol_time_moment( '2017-09-17' ).weekday , 6 )
			$mol_assert_equal( new $mol_time_moment( '2017-09-18' ).weekday , 0 )
		} ,

	} )
}
