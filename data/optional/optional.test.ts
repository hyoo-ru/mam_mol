namespace $ {
	
	const Age = $mol_data_optional( $mol_data_number )
	const Age_or_zero = $mol_data_optional( $mol_data_number, ()=> 0 )
	
	type result_type_of_optional = $mol_type_assert<
		typeof Age.Value,
		number | undefined
	>
	
	type result_type_of_fallbacked = $mol_type_assert<
		typeof Age_or_zero.Value,
		number
	>
	
	$mol_test({

		'Is not present'() {
			$mol_assert_equal(
				Age( undefined ),
				undefined,
			)
		} ,

		'Is present'() {
			$mol_assert_equal(
				Age( 0 ),
				0,
			)
		} ,

		'Fallbacked'() {
			$mol_assert_equal(
				Age_or_zero( undefined ),
				0,
			)
		} ,

		'Is null'() {
			$mol_assert_fail(
				()=> Age( null as any ),
				'null is not a number',
			)
		} ,

	})
}
