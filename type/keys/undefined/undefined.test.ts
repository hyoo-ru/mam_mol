namespace $ {

	type undefined1 = $mol_type_assert_never<

		$mol_type_keys_undefined<
			{ a: number | string }
		>

	>

	type undefined2 = $mol_type_assert<

		$mol_type_keys_undefined<
			{
				a: number | undefined
				b: number
				c: { d: number } | undefined
			}
		>,
		'a' | 'c'

	>

}
