namespace $ {

	type no_item = $mol_type_assert<
		$mol_type_tail< [] > ,
		[]
	>

	type one_item = $mol_type_assert<
		$mol_type_tail< [ 777 ] > ,
		[]
	>

	type two_items = $mol_type_assert<
		$mol_type_tail< [ 666 , 777 ] > ,
		[ 777 ]
	>

}
