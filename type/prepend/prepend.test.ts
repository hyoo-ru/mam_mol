namespace $ {

	type no_item = $mol_type_assert<
		$mol_type_prepend< 777 , [] > ,
		[ 777 ]
	>

	type one_item = $mol_type_assert<
		$mol_type_prepend< 666 , [ 777 ] > ,
		[ 666 , 777 ]
	>

}
