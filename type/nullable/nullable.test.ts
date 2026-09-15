namespace $ {

	type nullable_props =  $mol_type_assert<
		$mol_type_nullable<{ foo: number, bar?: string }>,
		{ foo: number | null, bar?: string | null }
	>

	type nullable_primitive =  $mol_type_assert<
		$mol_type_nullable< number | string >,
		number | string | null
	>

}
