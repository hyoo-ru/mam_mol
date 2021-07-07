namespace $ {
	$mol_test({

		'Is boolean - true' () {
			$mol_assert_equal( $$.$mol_data_boolean( true ), true )
		} ,

		'Is boolean - false' () {
			$mol_assert_equal( $$.$mol_data_boolean( false ), false )
		} ,

		'Is not boolean' () {
			$mol_assert_fail( ()=> {
				$$.$mol_data_boolean( 'x' as any )
			} , 'x is not a boolean' )
		} ,

		'Is object boolean' () {
			$mol_assert_fail( ()=> {
				$$.$mol_data_boolean( new Boolean( '' ) as any )
			} , 'false is not a boolean' )
		} ,

	})
}
