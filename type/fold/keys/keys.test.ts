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
			prom: Promise< any >
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
			prom?: Promise< any >
		}
	}


	type keys1 = $mol_type_assert<

		$mol_type_fold_keys<
			type_obj
		>,
		'foo' | 'foo.bar' | 'foo.lis' | 'foo.prom' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type keys2 = $mol_type_assert<

		$mol_type_fold_keys<
			type_obj_optional
		>,
		'foo' | 'foo.bar' | 'foo.lis' | 'foo.prom' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type point = { x: number; y: number }
	type endpoint1 = $mol_type_assert<

		$mol_type_fold_keys<
			type_obj & { position: point },
			point
		>,
		'foo' | 'position' | 'foo.bar' | 'foo.lis' | 'foo.prom' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type pick1 = $mol_type_assert<

		$mol_type_fold_keys_pick<
			type_obj,
			Array< number >
		>,
		'foo.lis'

	>

	type pick2 = $mol_type_assert<

		$mol_type_fold_keys_pick<
			type_obj_optional,
			| ( ()=> number )
			| undefined
		>,
		'foo.bar.wee.too'

	>

	type omit1 = $mol_type_assert<

		$mol_type_fold_keys_omit<
			type_obj,
			| string
			| ( ()=> number )
		>,
		'foo' | 'foo.bar' | 'foo.lis' | 'foo.prom' | 'foo.bar.wee'

	>

	type omit2 = $mol_type_assert<

		$mol_type_fold_keys_omit<
			type_obj_optional,
			| Array< number >
			| undefined
		>,
		'foo' | 'foo.bar' | 'foo.prom' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

}
