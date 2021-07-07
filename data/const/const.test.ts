namespace $ {
	$mol_test({

		'is same number' () {
			const parse_nan = $mol_data_const( Number.NaN )
			$mol_assert_equal( parse_nan.call( $$, Number.NaN ), Number.NaN )
		} ,

		'is different number' () {
			const parse_five = $$.$mol_data_const( 5 )
			$mol_assert_fail( ()=> parse_five.call( $$, 6 as any ) , '6 is not 5' )
		} ,

	})
}
