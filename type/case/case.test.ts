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

	type camel3 = $mol_type_assert<

		$mol_type_case_camel<
			[ 'FOO' ]
		>,
		'foo'

	>

	type pascal1 = $mol_type_assert<

		$mol_type_case_pascal<
			[ 'foo', 'bar', 'wee' ]
		>,
		'FooBarWee'

	>

	type pascal2 = $mol_type_assert<

		$mol_type_case_pascal<
			[ 'FOO', 'BAR', 'WEE' ]
		>,
		'FooBarWee'

	>

	type pascal3 = $mol_type_assert<

		$mol_type_case_pascal<
			[ 'FOO' ]
		>,
		'Foo'

	>

	type cobra1 = $mol_type_assert<

		$mol_type_case_cobra<
			[ 'foo', 'bar', 'wee' ]
		>,
		'Foo_bar_wee'

	>

	type cobra2 = $mol_type_assert<

		$mol_type_case_cobra<
			[ 'FOO', 'BAR', 'WEE' ]
		>,
		'Foo_bar_wee'

	>

	type cobra3 = $mol_type_assert<

		$mol_type_case_cobra<
			[ 'FOO' ]
		>,
		'Foo'

	>

	type scream1 = $mol_type_assert<

		$mol_type_case_scream<
			[ 'foo', 'bar', 'wee' ]
		>,
		'FOO_BAR_WEE'

	>

}
