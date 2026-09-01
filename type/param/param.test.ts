namespace $ {

	type no_params = $mol_type_assert<
		$mol_type_param< ()=> 777 , 0 > ,
		undefined
	>

	type single_param = $mol_type_assert<
		$mol_type_param< ( a : 777 )=> 666 , 0 > ,
		777
	>

	type two_params = $mol_type_assert<
		$mol_type_param< ( a : 777 , b : 888 )=> 666 , 1 > ,
		888
	>

}
