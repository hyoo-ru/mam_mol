namespace $ {

	type no_item = $mol_type_assert<
		$mol_type_append< [] , 777 > ,
		[ 777 ]
	>

	type one_item = $mol_type_assert<
		$mol_type_append< [ 666 ] , 777 > ,
		[ 666 , 777 ]
	>

}
