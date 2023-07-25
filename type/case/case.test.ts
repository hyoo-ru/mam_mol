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

}
