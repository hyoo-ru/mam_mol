namespace $ {
	$mol_test({

		'function'() {
			$mol_assert_not( $mol_func_is_class( function() {} ) )
		},
		
		'generator'() {
			$mol_assert_not( $mol_func_is_class( function*(){} ) )
		},

		'async'() {
			$mol_assert_not( $mol_func_is_class( async function(){} ) )
		},

		'arrow'() {
			$mol_assert_not( $mol_func_is_class( ()=> null ) )
		},

		'named class'() {
			$mol_assert_ok( $mol_func_is_class( class Foo {} ) )
		},

		'unnamed class'() {
			$mol_assert_ok( $mol_func_is_class( class {} ) )
		},

	})
}
