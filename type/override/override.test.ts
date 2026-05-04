namespace $ {

	type overrided_props =  $mol_type_assert<
		$mol_type_override<
			{ foo: 123, bar: 456 },
			{ foo: 777 }
		>,
		{ foo: 777, bar: 456 }
	>

}
