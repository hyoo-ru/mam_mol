namespace $ {
	$mol_test({

		'Is string' () {
			$mol_assert_equal( $$.$mol_data_string( '' ), '' )
		} ,

		'Is not string' () {
			$mol_assert_fail( ()=> {
				$$.$mol_data_string( 0 as any )
			} , '0 is not a string' )
		} ,

		'Is object string' () {
			$mol_assert_fail( ()=> {
				$$.$mol_data_string( new String( 'x' ) as any )
			} , 'x is not a string' )
		} ,

	})
}
