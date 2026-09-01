namespace $ {

	type deep_immutable_object = $mol_type_assert<
		$mol_type_immutable_deep< { foo: number[] } > ,
		{ readonly foo: readonly number[] }
	>

	type deep_immutable_array = $mol_type_assert<
		$mol_type_immutable_deep< number[][] > ,
		readonly ( readonly number[] )[]
	>

	type deep_immutable_tuple = $mol_type_assert<
		$mol_type_immutable_deep< [[number]] > ,
		readonly[ readonly[ number ] ]
	>

}
