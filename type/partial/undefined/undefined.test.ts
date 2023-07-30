namespace $ {

	type undefined1 = $mol_type_assert<
		$mol_type_partial_undefined< { a : 1 , b : 2 | undefined } > ,
		{ a : 1 , b? : 2 | undefined }
	>
	
	type undefined2 = $mol_type_assert<

		$mol_type_partial_undefined<
			{ a: number | { x: number } }
		>,
		{ a: number | { x: number } }

	>

}
