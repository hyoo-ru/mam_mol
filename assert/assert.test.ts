namespace $ {
	$mol_test( {
		
		'must be false'() {
			$mol_assert_not( 0 )
		} ,
		
		'must be true'() {
			$mol_assert_ok( 1 )
		} ,
		
		'must be equal'() {
			$mol_assert_equal( 2 , 2 )
		} ,
		
		'must be unique'() {
			$mol_assert_unique( [ 3 ] , [ 3 ] )
		} ,
		
	} )
}
