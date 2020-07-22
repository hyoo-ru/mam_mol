namespace $ {

	type primitives = $mol_type_assert<
		$mol_type_merge< number > ,
		number
	>

	type callable = $mol_type_assert<
		$mol_type_merge< ( foo : 1 )=> 2 > ,
		( foo : 1 )=> 2
	>

	type constructable = $mol_type_assert<
		$mol_type_merge< new ( foo : 1 )=> 2 > ,
		new ( foo : 1 )=> 2
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
