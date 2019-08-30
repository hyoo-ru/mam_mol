/**
 * Asserts for equality of `Actual` and `Expected` types.
 * Don't use `never` as `Expected` - use `$mol_type_assert_never` instead.
 */
type $mol_type_assert<
	Actual ,
	Expected extends $mol_type_equals< Actual , Expected > ,
> = Actual

/**
 * Asserts for `Actual` type is `never`.
 * 
 * 	$mol_type_assert_never< $mol_type_equals< 1 , 2 > >
 */
type $mol_type_assert_never< Actual extends never > = Actual
