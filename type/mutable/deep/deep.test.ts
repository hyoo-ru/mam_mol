namespace $ {

	type deep_mutable = $mol_type_assert<
		$mol_type_mutable_deep< { readonly foo: number[] } > ,
		{ foo: number[] }
	>

}
