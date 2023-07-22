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

	type type_obj_partial = $mol_type_partial_deep< type_obj >


	type keys1 = $mol_type_assert<

		$mol_type_fold_keys<
			type_obj
		>,
		'foo' | 'foo.bar' | 'foo.lis' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type keys2 = $mol_type_assert<

		$mol_type_fold_keys<
			type_obj_partial
		>,
		'foo' | 'foo.bar' | 'foo.lis' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

}
