namespace $ {

	type picked_props =  $mol_type_assert<
		$mol_type_pick<
			{
				foo: 1,
				bar: 2,
				lol: string
			},
			number
		>,
		{ foo: 1, bar: 2 }
	>

}
