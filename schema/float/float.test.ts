namespace $.$$ {
	$mol_test({
		
		"Float schema"( $ ) {
			
			$mol_assert_equal( '$mol_schema_float', $mol_schema_float + '', $mol_key( $mol_schema_float ) )
			
			$mol_assert_equal( true, $mol_schema_float.check( 0 ) )
			$mol_assert_equal( true, $mol_schema_float.check( Number.NaN ) )
			$mol_assert_equal( true, $mol_schema_float.check( Number.POSITIVE_INFINITY ) )
			$mol_assert_equal( false, $mol_schema_float.check( null ) )
			
			$mol_assert_equal( 1.5, $mol_schema_float.cast( 1.5 ) )
			$mol_assert_equal( Number.NaN, $mol_schema_float.cast( '0' ) )
			
			$mol_assert_equal( Number.EPSILON, $mol_schema_float.guard( Number.EPSILON ) )
			$mol_assert_fail( ()=> $mol_schema_float.guard( '0' ), 'Wrong type' )
			
		},
		
	})
}
