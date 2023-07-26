namespace $ {

	type keys1 = $mol_type_assert<

		$mol_type_case_upper_keys<
			{
				foo: 'bar'
				wee: 'too'
			}
		>,
		{
			FOO: 'bar'
			WEE: 'too'
		}

	>

	type values1 = $mol_type_assert<

		$mol_type_case_upper_values<
			{
				foo: 'bar'
				wee: 'too'
			}
		>,
		{
			foo: 'BAR'
			wee: 'TOO'
		}

	>

}
