namespace $ {

	$mol_test({

		'objects by reference' () {
			$mol_assert_equal( $mol_compare_any( {} , {} ) , false )
		} ,

		'primitives by value' () {
			$mol_assert_equal( $mol_compare_any( 'a' , 'a' ) , true )
		} ,

		'NaN by value' () {
			$mol_assert_equal( $mol_compare_any( Number.NaN , Number.NaN ) , true )
		} ,

		'NaN not equal zero' () {
			$mol_assert_equal( $mol_compare_any( Number.NaN , 0 ) , false )
		} ,

	})

}
