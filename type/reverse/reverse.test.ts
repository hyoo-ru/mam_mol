namespace $ {

	type no_item = $mol_type_assert<
		$mol_type_reverse< [] > ,
		[]
	>

	type one_item = $mol_type_assert<
		$mol_type_reverse< [ 777 ] > ,
		[ 777 ]
	>

	type two_item = $mol_type_assert<
		$mol_type_reverse< [ 666 , 777 ] > ,
		[ 777 , 666 ]
	>

	type three_item = $mol_type_assert<
		$mol_type_reverse< [ 555 , 666 , 777 ] > ,
		[ 777 , 666 , 555 ]
	>

}
