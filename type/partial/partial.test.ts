namespace $ {

	type deep_partial = $mol_type_assert<
		$mol_type_partial_deep< { a : { b : 1 } } > ,
		{ a? : { b? : 1 } }
	>

}
