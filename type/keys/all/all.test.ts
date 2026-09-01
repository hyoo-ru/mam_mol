namespace $ {

	type all1 = $mol_type_assert<

		$mol_type_keys_all<
			| { a: number }
			| { a: string; b: boolean }
			| { c: number }
		>,
		'a' | 'b' | 'c'

	>

}
