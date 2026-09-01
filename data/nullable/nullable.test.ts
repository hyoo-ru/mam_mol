namespace $ {
	$mol_test({

		'Is null' () {
			$mol_data_nullable( $mol_data_number )( null )
		} ,

		'Is not null' () {
			$mol_data_nullable( $mol_data_number )( 0 )
		} ,

		'Is undefined' () {
			$mol_assert_fail( ()=> {

				const Type = $mol_data_nullable( $mol_data_number )
				Type( undefined as any )

			} , 'undefined is not a number' )
		} ,

	})
}
