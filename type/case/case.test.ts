namespace $ {

	type snake1 = $mol_type_assert<

		$mol_type_case_snake<
			[ 'foo', 'bar', 'wee' ]
		>,
		'foo_bar_wee'

	>

}
