namespace $ {

	type split1 = $mol_type_assert<

		$mol_type_string_split<
			'',
			'-'
		>,
		[]

	>

	type split2 = $mol_type_assert<

		$mol_type_string_split<
			'foo_bar',
			'-'
		>,
		[ 'foo_bar' ]

	>

	type split3 = $mol_type_assert<

		$mol_type_string_split<
			'foo bar',
			''
		>,
		[ 'f', 'o', 'o', ' ', 'b', 'a', 'r' ]

	>

	type split4 = $mol_type_assert<

		$mol_type_string_split<
			'foo-bar-wee',
			'-'
		>,
		[ 'foo', 'bar', 'wee' ]

	>

	type split5 = $mol_type_assert<

		$mol_type_string_split<
			'+foo',
			'+'
		>,
		[ 'foo' ]

	>

}
