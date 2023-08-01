namespace $ {

	type keys1 = $mol_type_assert<

		$mol_type_filter_keys<
			| { a: number; b: string }
			| { b: number }
			| { a: string }
			| number,
			'a'
		>,
		| { a: number; b: string }
		| { a: string }

	>

	type keys2 = $mol_type_assert<

		$mol_type_filter_keys<
			| { a?: number; b?: string }
			| { b?: number }
			| { a?: string }
			| number,
			'a'
		>,
		| { a?: number; b?: string }
		| { a?: string }

	>

}
