namespace $ {

	type deep_partial = $mol_type_assert<
		$mol_type_partial_deep< { a : { b : 1 } } > ,
		{ a? : { b? : 1 } }
	>

	type deep_partial2 = $mol_type_assert<

		$mol_type_partial_deep<
			{
				foo: {
					bar: {
						wee: ()=> number
					},
					too: number
				}
			}
		>,
		{
			foo?: {
				bar?: {
					wee?: ( ()=> number ) | undefined
				},
				too?: number | undefined
			}
		}

	>
	
	type deep_partial3 = $mol_type_assert<
	
		$mol_type_partial_deep<
			number
		>,
		number
	
	>

}
