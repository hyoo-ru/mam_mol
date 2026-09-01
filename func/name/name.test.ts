namespace $ {

	$mol_test({
		
		'FQN of anon function'($) {
			const $$ = Object.assign( $ , { $mol_func_name_test : ( ()=> ()=> {} )() } )
			$mol_assert_equal( $$.$mol_func_name_test.name , '' )
			$mol_assert_equal( $$.$mol_func_name( $$.$mol_func_name_test ) , '$mol_func_name_test' )
			$mol_assert_equal( $$.$mol_func_name_test.name , '$mol_func_name_test' )
		},

	})

}
