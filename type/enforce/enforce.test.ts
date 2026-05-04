namespace $ {

	// Positive

	type subtype = $mol_type_enforce< 777 , number >
	type same = $mol_type_enforce< number , number >

	// Negative

	// @ts-expect-error
	type supertype = $mol_type_enforce< number, 666 >
	// @ts-expect-error
	type different = $mol_type_enforce< '666', 666 >
	
}
