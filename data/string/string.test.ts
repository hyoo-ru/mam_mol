namespace $ {
	$mol_test({

		'Is string' () {
			$mol_data_string( '' )
		} ,

		'Is not string' () {
			$mol_assert_fail( ()=> {
				$mol_data_string( 0 as any )
			} , 'is not a string' )
		} ,

		'Is object string' () {
			$mol_assert_fail( ()=> {
				$mol_data_string( new String( '' ) as any )
			} , 'is not a string' )
		} ,

	})
}
