namespace $ {

	type deep_immutable = $mol_type_assert<
		$mol_type_immutable_deep< { foo: number[] } > ,
		{ readonly foo: readonly number[] }
	>

}
