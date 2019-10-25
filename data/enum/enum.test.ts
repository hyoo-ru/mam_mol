namespace $ {
	enum Sex { male , female }
	const SexParser = $mol_data_enum( 'Sex', Sex )

	$mol_test({
		'Is type of Sex enum' () {
			$mol_assert_equal(SexParser(0), 'male' )
		} ,

		'Is not a type of enum - number' () {
			$mol_assert_fail( ()=> {
				SexParser(2)
			} , `key 2 is not a type of Sex enum` )
		} ,

		'Is not a type of enum numeric - string' () {
			$mol_assert_fail( ()=> {
				SexParser('male' as any)
			} , 'is not a number' )
		} ,

	})
}
