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


	type flat1 = $mol_type_assert<

		$mol_type_flat_camel<
			type_obj
		>,
		{
			fooLis: Array< number >
			fooBarKek: string
			fooBarWeeToo: ()=> number
		}

	>

	type flat2 = $mol_type_assert<

		$mol_type_flat_camel<
			type_obj_optional
		>,
		{
			fooLis?: Array< number > | undefined
			fooBarKek?: string | undefined
			fooBarWeeToo?: ( ()=> number ) | undefined
		}

	>

	type flat_endpoint1 = $mol_type_assert<

		$mol_type_flat_camel<
			{
				foo: { bar: { position: point } }
			},
			point
		>,
		{
			fooBarPosition: point
		}

	>

	type flat_endpoint2 = $mol_type_assert<

		$mol_type_flat_camel<
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
