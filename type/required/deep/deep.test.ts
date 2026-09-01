namespace $ {

	type deep1 = $mol_type_assert<

		$mol_type_required_deep<
			{
				foo?: {
					bar?: {
						wee?: ()=> number
					}
					too: number | undefined
				}
			}
		>,
		{
			foo: {
				bar: {
					wee: ()=> number
				}
				too: number
			}
		}

	>

}
