namespace $ {
	$mol_test({

		'is same number' () {
			$mol_data_const( Number.NaN )( Number.NaN )
		} ,

		'is different number' () {
			const Five = $mol_data_const( 5 )
			$mol_assert_fail( ()=> Five( 6 as any ) , '6 is not 5' )
		} ,

	})
}
