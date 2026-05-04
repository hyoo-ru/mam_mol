namespace $ {

	// Positive

	type equal_numbers = $mol_type_assert<
		$mol_type_equals< 777 , 777 > ,
		true
	>

	type equal_objects = $mol_type_assert<
		$mol_type_equals< { a : { b : 1 } } , { a : { b : 1 } } > ,
		true
	>

	type equal_unions = $mol_type_assert<
		$mol_type_equals< 1|2 , 2|1 > ,
		true
	>

	type nevers = $mol_type_assert<
		$mol_type_equals< never , never > ,
		true
	>

	type voids = $mol_type_assert<
		$mol_type_equals< void , void > ,
		true
	>

	type unknowns = $mol_type_assert<
		$mol_type_equals< unknown , unknown > ,
		true
	>

	type undefineds = $mol_type_assert<
		$mol_type_equals< undefined , undefined > ,
		true
	>

	type nulls = $mol_type_assert<
		$mol_type_equals< null , null > ,
		true
	>

	type anys = $mol_type_assert<
		$mol_type_equals< any , any > ,
		true
	>

	// Negative

	type unique_numbers = $mol_type_assert<
		$mol_type_equals< 666 , 777 >,
		false
	>

	type unique_objects = $mol_type_assert<
		$mol_type_equals< { a : { b : 1 } } , { a : { c : 1 } } >,
		false
	>

	type object_extension = $mol_type_assert<
		$mol_type_equals< { a : 1 } , { a : 1 , b : 2 } >,
		false
	>

	type unique_unions = $mol_type_assert<
		$mol_type_equals< 1|2 , 1|2|3 >,
		false
	>

	type number_subtype = $mol_type_assert<
		$mol_type_equals< number , 777 >,
		false
	>

	type never_number = $mol_type_assert<
		$mol_type_equals< never , 777 >,
		false
	>

	type void_number = $mol_type_assert<
		$mol_type_equals< void , 777 >,
		false
	>

	type unknown_number = $mol_type_assert<
		$mol_type_equals< unknown , 777 >,
		false
	>

	type undefined_number = $mol_type_assert<
		$mol_type_equals< undefined , 777 >,
		false
	>

	type null_number = $mol_type_assert<
		$mol_type_equals< null , 777 >,
		false
	>

	type any_number = $mol_type_assert<
		$mol_type_equals< any , 777 >,
		false
	>

	type any_unknown = $mol_type_assert<
		$mol_type_equals< any , unknown >,
		false
	>

	type never_void = $mol_type_assert<
		$mol_type_equals< never , void >,
		false
	>

}
