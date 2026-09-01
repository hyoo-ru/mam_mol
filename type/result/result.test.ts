namespace $ {

	type function_result = $mol_type_assert<
		$mol_type_result< ()=> 777 > ,
		777
	>

	type class_instance = $mol_type_assert<
		$mol_type_result< new()=> 777 > ,
		777
	>

}
