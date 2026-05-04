namespace $ {

	type filtered_record =  $mol_type_assert<
		$mol_type_omit<
			{
				foo: 1,
				bar: 2,
				lol: string
			},
			number
		>,
		{ lol: string }
	>

}
