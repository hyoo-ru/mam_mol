namespace $ {

	type keys1 = $mol_type_assert<

		$mol_type_case_lower_keys<
			{
				FOO: 'BAR',
				WEE: 'TOO'
			}
		>,
		{
			foo: 'BAR',
			wee: 'TOO'
		}

	>

	type values1 = $mol_type_assert<

		$mol_type_case_lower_values<
			{
				FOO: 'BAR',
				WEE: 'TOO'
			}
		>,
		{
			FOO: 'bar',
			WEE: 'too'
		}

	>

	type values2 = $mol_type_assert<

		$mol_type_case_lower_values<
			[ 'FOO', 'BAR', 'WEE' ]
		>,
		[ 'foo', 'bar', 'wee' ]

	>

}
