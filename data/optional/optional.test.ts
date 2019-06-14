namespace $ {
	$mol_test({

		'Is not present' () {
			$mol_data_optional( $mol_data_number )( undefined )
		} ,

		'Is present' () {
			$mol_data_optional( $mol_data_number )( 0 )
		} ,

		'Is null' () {
			$mol_assert_fail( ()=> {
				$mol_data_optional( $mol_data_number )( null as any )
			} , 'is not a number' )
		} ,

	})
}
