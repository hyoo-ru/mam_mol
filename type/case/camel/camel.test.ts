namespace $ {

	type type1 = $mol_type_assert<

		$mol_type_case_camel<
			'foo',
			'bar'
		>,
		'fooBar'

	>

}
