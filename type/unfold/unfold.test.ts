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

	type type_obj_partial = {
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


	type unfold1 = $mol_type_assert<

		$mol_type_unfold<
			type_obj,
			'foo'
		>,
		{
			bar: {
				wee: {
					too: ()=> number
				}
				kek: string
			},
			lis: Array< number >
		}

	>

	type unfold2 = $mol_type_assert<

		$mol_type_unfold<
			type_obj,
			'foo.bar.wee.too'
		>,
		()=> number

	>

	type unfold3 = $mol_type_assert<

		$mol_type_unfold<
			type_obj_partial,
			'foo.lis'
		>,
		| Array< number >
		| undefined

	>

	type unfold4 = $mol_type_assert<

		$mol_type_unfold<
			type_obj_partial,
			'foo.bar.wee.too'
		>,
		| ( ()=> number )
		| undefined

	>

}
