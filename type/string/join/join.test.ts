namespace $ {

	type join1 = $mol_type_assert<

		$mol_type_string_join<
			[ 'foo' ],
			'%'
		>,
		'foo'

	>

	type join2 = $mol_type_assert<

		$mol_type_string_join<
			[ 'foo', 'bar', 'wee' ],
			''
		>,
		'foobarwee'

	>

	type join3 = $mol_type_assert<

		$mol_type_string_join<
			[ 'foo', 'bar', 'wee' ],
			'%'
		>,
		'foo%bar%wee'

	>

	type join4 = $mol_type_assert<

		$mol_type_string_join<
			[ 'foo', 'bar', '', 'wee' ],
			'%'
		>,
		'foo%bar%wee'

	>

}
