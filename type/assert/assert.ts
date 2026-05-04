namespace $ {

	/**
	 * Asserts for equality of `Actual` and `Expected` types.
	 */
	export type $mol_type_assert<
		Actual extends $mol_type_equals< Actual , Expected > extends true ? unknown
			: $mol_type_equals< Actual , any > extends true ? never
			: $mol_type_error< 'Assert failed', {
				actual: Actual ,
				expected: Expected
			} >,
		Expected extends $mol_type_equals< Actual , Expected > extends true ? unknown
			: $mol_type_equals< Expected , any > extends true ? never
			: $mol_type_error< 'Assert failed', {
				actual: Actual ,
				expected: Expected
			} >
	> = Actual

	/**
	 * Asserts for `Actual` type is `never`.
	 * @deprecated Use `$mol_type_assert< A, B >`
	 * 
	 * 	$mol_type_assert_never< $mol_type_equals< 1 , 2 > >
	 */
	export type $mol_type_assert_never< Actual extends never > = Actual

}
