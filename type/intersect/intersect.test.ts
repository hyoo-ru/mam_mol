namespace $ {

	type numbers = $mol_type_assert<
		$mol_type_intersect< 1 | 2 > ,
		1 & 2
	>

	type object_extension = $mol_type_assert<
		$mol_type_intersect< { a : 1 } | { a : 1 , c : 2 } > ,
		{ a : 1 } & { a : 1 , c : 2 }
	>

	type number_string = $mol_type_assert<
		$mol_type_intersect< number | string > ,
		number & string
	>

}
