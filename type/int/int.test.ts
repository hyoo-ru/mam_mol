namespace $ {

	// type wrong_ints = $mol_type_int_plus< 'b40', '60b' >

	type plus = $mol_type_assert<
		$mol_type_int_plus< 40, '60' >,
		100
	>

	type minus = $mol_type_assert<
		$mol_type_int_minus< 100, '60' >,
		40
	>

	type minus_same = $mol_type_assert<
		$mol_type_int_minus< 100, '100' >,
		0
	>

	type minus_overflow = $mol_type_assert_never<
		$mol_type_int_minus< 60, '100' >
	>

	type mult = $mol_type_assert<
		$mol_type_int_mult< 40, '40' >,
		1600
	>

	type pow = $mol_type_assert<
		$mol_type_int_pow< 2, '13' >,
		8192
	>

	type asc = $mol_type_assert<
		$mol_type_int_ordered< 40, '60' >,
		unknown
	>

	type desc = $mol_type_assert_never<
		$mol_type_int_ordered< 60, '40' >
	>
	
	type calc_priorities = $mol_type_assert<
		$mol_type_int_calc< '5+4*3^2-1' >,
		40
	>

	type calc_parentheses = $mol_type_assert<
		$mol_type_int_calc< '2*(2+3)' >,
		10
	>

	type calc_spaces = $mol_type_assert<
		$mol_type_int_calc< '7 + 5 - 2*2 + 1' >,
		9
	>	

}
