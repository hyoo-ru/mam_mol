namespace $ {

	type dot1 = $mol_type_assert<

		$mol_type_case_dot<
			'foo',
			'bar'
		>,
		'foo.bar'

	>

}
