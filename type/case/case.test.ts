namespace $ {

	type snake1 = $mol_type_assert<

		$mol_type_case_snake<
			[ 'foo', 'bar', 'wee' ]
		>,
		'foo_bar_wee'

	>

	type snake_parse1 = $mol_type_assert<

		$mol_type_case_snake_parse<
			'foo_bar_wee'
		>,
		[ 'foo', 'bar', 'wee' ]

	>


	type kebab1 = $mol_type_assert<

		$mol_type_case_kebab<
			[ 'foo', 'bar', 'wee' ]
		>,
		'foo-bar-wee'

	>

	type kebab_parse1 = $mol_type_assert<

		$mol_type_case_kebab_parse<
			'foo-bar-wee'
		>,
		[ 'foo', 'bar', 'wee' ]

	>


	type dot1 = $mol_type_assert<

		$mol_type_case_dot<
			[ 'foo', 'bar', 'wee' ]
		>,
		'foo.bar.wee'

	>

	type dot_parse1 = $mol_type_assert<

		$mol_type_case_dot_parse<
			'foo.bar.wee'
		>,
		[ 'foo', 'bar', 'wee' ]

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

	type camel_parse1 = $mol_type_assert<

		$mol_type_case_camel_parse<
			'fooBarWee'
		>,
		[ 'foo', 'bar', 'wee' ]

	>

	type camel_parse2 = $mol_type_assert<

		$mol_type_case_camel_parse<
			'FooBarWee'
		>,
		[ 'foo', 'bar', 'wee' ]

	>

	type camel_parse3 = $mol_type_assert<

		$mol_type_case_camel_parse<
			'fooBarW'
		>,
		[ 'foo', 'bar', 'w' ]

	>

	type camel_parse4 = $mol_type_assert<

		$mol_type_case_camel_parse<
			'foo1Bar2Wee3'
		>,
		[ 'foo', '1', 'bar', '2', 'wee', '3' ]

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

	type pascal_parse1 = $mol_type_assert<

		$mol_type_case_pascal_parse<
			'FooBarWee'
		>,
		[ 'foo', 'bar', 'wee' ]

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

	type cobra_parse1 = $mol_type_assert<

		$mol_type_case_cobra_parse<
			'Foo_bar_wee'
		>,
		[ 'foo', 'bar', 'wee' ]

	>

	type cobra_parse2 = $mol_type_assert<

		$mol_type_case_cobra_parse<
			'Foo'
		>,
		[ 'foo' ]

	>


	type scream1 = $mol_type_assert<

		$mol_type_case_scream<
			[ 'foo', 'bar', 'wee' ]
		>,
		'FOO_BAR_WEE'

	>

	type scream_parse1 = $mol_type_assert<

		$mol_type_case_scream_parse<
			'FOO_BAR_WEE'
		>,
		[ 'foo', 'bar', 'wee' ]

	>

}
