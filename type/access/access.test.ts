namespace $ {

	type access1 = $mol_type_assert<

		$mol_type_access<
			{ a: number },
			'a'
		>,
		number

	>

	type access2 = $mol_type_assert<

		$mol_type_access<
			{ a?: number },
			'a'
		>,
		number | undefined

	>

	type access3 = $mol_type_assert<

		$mol_type_access<
			| { a: number }
			| undefined,
			'a'
		>,
		number

	>

	type access4 = $mol_type_assert<

		$mol_type_access<
			{ a: number } | { b: string },
			'a'
		>,
		number

	>

	type access5 = $mol_type_assert<

		$mol_type_access<
			| { a: number }
			| { a: string; b: number }
			| boolean,
			'a'
		>,
		number | string

	>

}
