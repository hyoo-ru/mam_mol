namespace $ {

	type type_obj = {
		foo: {
			bar: {
				wee: {
					too: ()=> number
				}
				kek: string
			}
			lis: Array< number >
		}
	}

	type type_obj_optional = {
		foo?: {
			bar?: {
				wee?: {
					too?: ()=> number
				}
				kek?: string
			}
			lis?: Array< number >
		}
	}

	type point = { x: number; y: number }


	type fold1 = $mol_type_assert<

		$mol_type_fold<
			type_obj
		>,
		{
			fooLis: Array< number >
			fooBarKek: string
			fooBarWeeToo: ()=> number
		}

	>

	type fold2 = $mol_type_assert<

		$mol_type_fold<
			type_obj_optional
		>,
		{
			fooLis?: Array< number > | undefined
			fooBarKek?: string | undefined
			fooBarWeeToo?: ( ()=> number ) | undefined
		}

	>

	type fold_endpoint1 = $mol_type_assert<

		$mol_type_fold<
			{
				foo: { bar: { position: point } }
			},
			point
		>,
		{
			fooBarPosition: point
		}

	>

	type fold_endpoint2 = $mol_type_assert<

		$mol_type_fold<
			{
				foo: { bar: { position: point | number } }
			},
			point
		>,
		{
			fooBarPosition: point | number
		}

	>

}
