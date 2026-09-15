namespace $ {

	// Positive

	type equal_numbers = $mol_type_assert< 777 , 777 >
	type nevers = $mol_type_assert< never, never >
	type anyes = $mol_type_assert< any , any >
	type unknowns = $mol_type_assert< unknown , unknown >
	type voids = $mol_type_assert< void , void >

	// Negative

	// @ts-expect-error
	type number_never = $mol_type_assert< 777, never >
	// @ts-expect-error
	type unique_numbers = $mol_type_assert< 666 , 777 >
	// @ts-expect-error
	type never_number = $mol_type_assert< never , 777 >
	// @ts-expect-error
	type number_any = $mol_type_assert< 777 , any >
	// @ts-expect-error
	type unknown_number = $mol_type_assert< unknown , 777 >
	// @ts-expect-error
	type void_number = $mol_type_assert< void , 777 >
	// @ts-expect-error
	type number_super = $mol_type_assert< 777 , number >
	// @ts-expect-error
	type unknown_any = $mol_type_assert< unknown , any >
	// @ts-expect-error
	type any_unknown = $mol_type_assert< any , unknown >
	// @ts-expect-error
	type never_any = $mol_type_assert< never , any >
	// @ts-expect-error
	type any_void = $mol_type_assert< any , void >
	
}
