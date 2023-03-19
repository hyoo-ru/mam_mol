namespace $ {

	/**
	 * Asserts for equality of `Actual` and `Expected` types.
	 * Don't use `never` as `Expected` - use `mol_type_assert_never` instead.
	 */
	export type $mol_type_assert<
		Actual ,
		Expected extends
		| $mol_type_equals< Actual , Expected >
		| $mol_type_error< 'Assert failed', {
			actual: Actual ,
			expected: Expected
		} >
	> = Actual

	/**
	 * Asserts for `Actual` type is `never`.
	 * 
	 * 	$mol_type_assert_never< $mol_type_equals< 1 , 2 > >
	 */
	export type $mol_type_assert_never< Actual extends never > = Actual

}
