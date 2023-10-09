namespace $ {

	type keys1 = $mol_type_assert<

		$mol_type_case_capital_keys<
			{
				foo: 'bar',
				wee: 'too'
			}
		>,
		{
			Foo: 'bar',
			Wee: 'too'
		}

	>

	type values1 = $mol_type_assert<

		$mol_type_case_capital_values<
			{
				foo: 'bar',
				wee: 'too'
			}
		>,
		{
			foo: 'Bar',
			wee: 'Too'
		}

	>

	type values2 = $mol_type_assert<

		$mol_type_case_capital_values<
			[ 'foo', 'bar', 'wee' ]
		>,
		[ 'Foo', 'Bar', 'Wee' ]

	>

}
