namespace $ {

	type no_item = $mol_type_assert_never<
		$mol_type_foot< [] >
	>

	type one_item = $mol_type_assert<
		$mol_type_foot< [ 777 ] > ,
		777
	>

	type two_items = $mol_type_assert<
		$mol_type_foot< [ 666 , 777 ] > ,
		777
	>

}
