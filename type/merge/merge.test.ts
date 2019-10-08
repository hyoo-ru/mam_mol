namespace $ {

	type primitives = $mol_type_assert<
		$mol_type_merge< number > ,
		number
	>

	type different_fields = $mol_type_assert<
		$mol_type_merge< { a : 1 }&{ b : 2 } > ,
		{ a : 1 , b : 2 }
	>

	type same_fields = $mol_type_assert<
		$mol_type_merge< { a : { x : 1 } }&{ a : { y : 2 } } > ,
		{ a : { x : 1 , y : 2 } }
	>

}
