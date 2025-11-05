namespace $ {
	$mol_test({

		'Is empty dict' () {
			$mol_data_dict( $mol_data_number )( {} )
		} ,

		'Is dict' () {
			$mol_data_dict( $mol_data_number )({ foo : 123 })
		} ,

		'Is not dict' () {
			$mol_assert_fail( ()=> {
				$mol_data_dict( $mol_data_number )( [ 123 ] as any )
			} , '123 is not an Object' )
		} ,

		'Has wrong item' () {
			$mol_assert_fail( ()=> {
				$mol_data_dict( $mol_data_number )({ foo : 1 , bar : '1' as any as number })
			} , 'Dictionary field invalid' )
		} ,

		'Has wrong deep item' () {
			$mol_assert_fail( ()=> {
				$mol_data_dict( $mol_data_dict( $mol_data_number ) )( { foo : { bar : false as any as number } } )
			} , 'Dictionary field invalid' )
		} ,

	})
}
