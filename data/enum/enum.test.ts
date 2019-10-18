namespace $ {
	enum Sex { male , female }
	const SexParser = $mol_data_enum( 'Sex', Sex )

	$mol_test({
		'Is type of Sex enum - string' () {
			SexParser('male')
		} ,

		'Is type of Sex enum - number' () {
			SexParser(0)
		} ,

		'Is type of Sex enum - return number' () {
			SexParser('male') === 0
		} ,

		'Is type of Sex enum - return string' () {
			SexParser(0) === 'male'
		} ,

		'Is not a type of enum - number' () {
			$mol_assert_fail( ()=> {
				SexParser(2)
			} , 'is not a type of Sex enum' )
		} ,

		'Is not a type of enum - string' () {
			$mol_assert_fail( ()=> {
				SexParser('a')
			} , 'is not a type of Sex enum' )
		} ,

	})
}
