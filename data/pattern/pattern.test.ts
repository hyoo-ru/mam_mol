namespace $ {
	
	const Parse = $mol_data_pattern( /^-$/ )
	
	$mol_test({

		'Is fit' () {
			$mol_assert_equal( Parse.call( $$, '-' ), '-' )
		} ,

		'Is not fit' () {
			$mol_assert_fail( ()=> {
				Parse.call( $$, '+' )
			} , '+ is not a /^-$/' )
		} ,

	})
	
}
