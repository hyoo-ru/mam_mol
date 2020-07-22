namespace $ {
	$mol_test({

		'Is empty array' () {
			$mol_data_array( $mol_data_number )( [] )
		} ,

		'Is array' () {
			$mol_data_array( $mol_data_number )( [ 1 , 2 ] )
		} ,

		'Is not array' () {
			$mol_assert_fail( ()=> {
				$mol_data_array( $mol_data_number )( { [0] : 1 , length : 1 , map : ()=> {} } as any as number[] )
			} , '[object Object] is not an array' )
		} ,

		'Has wrong item' () {
			$mol_assert_fail( ()=> {
				$mol_data_array( $mol_data_number )( [ 1 , '1' as any as number ] )
			} , '[1] 1 is not a number' )
		} ,

		'Has wrong deep item' () {
			$mol_assert_fail( ()=> {
				$mol_data_array( $mol_data_array( $mol_data_number ) )( [ [] , [ 0 , 0 , false ] ] as any )
			} , '[1] [2] false is not a number' )
		} ,

	})
}
