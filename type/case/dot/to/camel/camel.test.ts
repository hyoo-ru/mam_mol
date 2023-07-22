namespace $ {

	type to_camel1 = $mol_type_assert<

		$mol_type_case_dot_to_camel<
			'foo.bar.wee'
		>,
		'fooBarWee'

	>

}
