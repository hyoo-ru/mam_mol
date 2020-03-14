namespace $ {

	type some_value =  $mol_type_assert<$mol_type_writable<{
		readonly a: number
	}> , {
		a: number
	} >

}
