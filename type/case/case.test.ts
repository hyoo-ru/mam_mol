namespace $ {

	type snake1 = $mol_type_assert<

		$mol_type_case_snake<
			[ 'foo', 'bar', 'wee' ]
		>,
		'foo_bar_wee'

	>

	type kebab1 = $mol_type_assert<

		$mol_type_case_kebab<
			[ 'foo', 'bar', 'wee' ]
		>,
		'foo-bar-wee'

	>

	type dot1 = $mol_type_assert<

		$mol_type_case_dot<
			[ 'foo', 'bar', 'wee' ]
		>,
		'foo.bar.wee'

	>

	type camel1 = $mol_type_assert<

		$mol_type_case_camel<
			[ 'foo', 'bar', 'wee' ]
		>,
		'fooBarWee'

	>

	type camel2 = $mol_type_assert<

		$mol_type_case_camel<
			[ 'FOO', 'BAR', 'WEE' ]
		>,
		'fooBarWee'

	>

}
