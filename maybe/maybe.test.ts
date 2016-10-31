namespace $ {
	$mol_test( {
		
		'all cases of using maybe'() {
			$mol_assert_equal( $mol_maybe( 0 )[ 0 ] , 0 )
			$mol_assert_equal( $mol_maybe( false )[ 0 ] , false )
			$mol_assert_equal( $mol_maybe( null )[ 0 ] , void 0 )
			$mol_assert_equal( $mol_maybe( void 0 )[ 0 ] , void 0 )
			
			$mol_assert_equal( $mol_maybe( void 0 ).map( v => v.toString() )[ 0 ] , void 0 )
			$mol_assert_equal( $mol_maybe( 0 ).map( v => v.toString() )[ 0 ] , '0' )
		} ,
		
	} )
}
