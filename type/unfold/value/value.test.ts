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


	type value1 = $mol_type_assert<

		$mol_type_unfold_value<
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

	type value2 = $mol_type_assert<

		$mol_type_unfold_value<
			type_obj,
			'foo.bar.wee.too'
		>,
		()=> number

	>

	type value3 = $mol_type_assert<

		$mol_type_unfold_value<
			type_obj_partial,
			'foo.lis'
		>,
		| Array< number >
		| undefined

	>

	type value4 = $mol_type_assert<

		$mol_type_unfold_value<
			type_obj_partial,
			'foo.bar.wee.too'
		>,
		| ( ()=> number )
		| undefined

	>

	type value5 = $mol_type_assert<

		$mol_type_unfold_value<
			| { a: number }
			| undefined,
			'a'
		>,
		number

	>

	type value6 = $mol_type_assert<

		$mol_type_unfold_value<
			| { a?: { b: { c: number } | undefined } }
			| undefined,
			'a.b.c'
		>,
		number

	>

}
