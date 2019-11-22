namespace $ {
	$mol_test({

		'Is fit' () {
			$mol_data_pattern( /^-$/ )( '-' )
		} ,

		'Is not fit' () {
			$mol_assert_fail( ()=> {
				$mol_data_pattern( /^-$/ )( '+' )
			} , '+ is not a /^-$/' )
		} ,

	})
}
