namespace $ {
	$mol_test({

		'Is integer' () {
			$mol_data_integer( 0 )
		} ,

		'Is float' () {
			$mol_assert_fail( ()=> {
				$mol_data_integer( 1.1 )
			} , 'is not an integer' )
		} ,

	})
}
