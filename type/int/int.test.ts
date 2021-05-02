namespace $ {

	type plus = $mol_type_assert<
		$mol_type_int_plus< 40, 60 >,
		100
	>

	type minus = $mol_type_assert<
		$mol_type_int_minus< 100, 60 >,
		40
	>

	type minus_overflow = $mol_type_assert_never<
		$mol_type_int_minus< 60, 100 >
	>

	type mult = $mol_type_assert<
		$mol_type_int_mult< 40, 40 >,
		1600
	>

	type pow = $mol_type_assert<
		$mol_type_int_pow< 2, 13 >,
		8192
	>

	type asc = $mol_type_assert<
		$mol_type_int_ordered< 40, 60 >,
		unknown
	>

	type desc = $mol_type_assert_never<
		$mol_type_int_ordered< 60, 40 >
	>

}
