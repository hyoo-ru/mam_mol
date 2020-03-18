namespace $ {

	export const $mol_func_name_test = ()=>( ()=> {} )()

	$mol_test({

		'FQN of anon function'() {
			$mol_assert_equal( $mol_func_name_test.name , '' )
			$mol_assert_equal( $mol_func_name( $mol_func_name_test ) , '$mol_func_name_test' )
			$mol_assert_equal( $mol_func_name_test.name , '$mol_func_name_test' )
		},

	})

}
