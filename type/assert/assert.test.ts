namespace $ {

	// Positive

	type equal_numbers = $mol_type_assert< 777 , 777 >
	type nevers = $mol_type_assert_never< never >
	type anyes = $mol_type_assert< any , any >
	type unknowns = $mol_type_assert< unknown , unknown >
	type voids = $mol_type_assert< void , void >

	// Negative

	// type number_never = $mol_type_assert_never< 777 >
	// type unique_numbers = $mol_type_assert< 666 , 777 >
	// type never_number = $mol_type_assert< never , 777 >
	// type number_any = $mol_type_assert< 777 , any >
	// type unknown_number = $mol_type_assert< unknown , 777 >
	// type void_number = $mol_type_assert< void , 777 >
	// type number_super = $mol_type_assert< 777 , number >
	// type unknown_any = $mol_type_assert< unknown , any >
	// type any_unknown = $mol_type_assert< any , unknown >
	// type never_any = $mol_type_assert< never , any >
	// type any_void = $mol_type_assert< any , void >

}
