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

				const Type = $mol_data_optional( $mol_data_number )
				Type( null as any )

			} , 'null is not a number' )
		} ,

	})
}
