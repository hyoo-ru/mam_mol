namespace $ {

	// Positive

	type equal_numbers = $mol_type_assert<
		$mol_type_equals< 777 , 777 > ,
		unknown
	>

	type equal_objects = $mol_type_assert<
		$mol_type_equals< { a : { b : 1 } } , { a : { b : 1 } } > ,
		unknown
	>

	type equal_unions = $mol_type_assert<
		$mol_type_equals< 1|2 , 2|1 > ,
		unknown
	>

	type nevers = $mol_type_assert<
		$mol_type_equals< never , never > ,
		unknown
	>

	type voids = $mol_type_assert<
		$mol_type_equals< void , void > ,
		unknown
	>

	type unknowns = $mol_type_assert<
		$mol_type_equals< unknown , unknown > ,
		unknown
	>

	type undefineds = $mol_type_assert<
		$mol_type_equals< undefined , undefined > ,
		unknown
	>

	type nulls = $mol_type_assert<
		$mol_type_equals< null , null > ,
		unknown
	>

	type anys = $mol_type_assert<
		$mol_type_equals< any , any > ,
		unknown
	>

	// Negative

	type unique_numbers = $mol_type_assert_never<
		$mol_type_equals< 666 , 777 >
	>

	type unique_objects = $mol_type_assert_never<
		$mol_type_equals< { a : { b : 1 } } , { a : { c : 1 } } >
	>

	type object_extension = $mol_type_assert_never<
		$mol_type_equals< { a : 1 } , { a : 1 , b : 2 } >
	>

	type unique_unions = $mol_type_assert_never<
		$mol_type_equals< 1|2 , 1|2|3 >
	>

	type number_subtype = $mol_type_assert_never<
		$mol_type_equals< number , 777 >
	>

	type never_number = $mol_type_assert_never<
		$mol_type_equals< never , 777 >
	>

	type void_number = $mol_type_assert_never<
		$mol_type_equals< void , 777 >
	>

	type unknown_number = $mol_type_assert_never<
		$mol_type_equals< unknown , 777 >
	>

	type undefined_number = $mol_type_assert_never<
		$mol_type_equals< undefined , 777 >
	>

	type null_number = $mol_type_assert_never<
		$mol_type_equals< null , 777 >
	>

	type any_number = $mol_type_assert_never<
		$mol_type_equals< any , 777 >
	>

	type any_unknown = $mol_type_assert_never<
		$mol_type_equals< any , unknown >
	>

	type never_void = $mol_type_assert_never<
		$mol_type_equals< never , void >
	>

}
