namespace $ {

	type deep_partial = $mol_type_assert<
		$mol_type_partial_undefined< { a : 1 , b : 2 | undefined } > ,
		{ a : 1 , b? : 2 | undefined }
	>

}
