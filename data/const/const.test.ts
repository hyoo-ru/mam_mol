namespace $ {
	$mol_test({

		'is same number' () {
			$mol_data_const( Number.NaN )( Number.NaN )
		} ,

		'is different number' () {
			$mol_assert_fail( ()=> $mol_data_const( 5 )( 6 ) , 'is not 5' )
		} ,

	})
}
