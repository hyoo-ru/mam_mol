namespace $.$$ {
	$mol_test({
		
		"Integer schema"( $ ) {
			
			$mol_assert_equal( '$mol_schema_integer', $mol_schema_integer + '', $mol_key( $mol_schema_integer ) )
			
			$mol_assert_equal( true, $mol_schema_integer.check( Number.MAX_SAFE_INTEGER ) )
			$mol_assert_equal( true, $mol_schema_integer.check( Number.MIN_SAFE_INTEGER ) )
			$mol_assert_equal( true, $mol_schema_integer.check( 0 ) )
			
			$mol_assert_equal( false, $mol_schema_integer.check( Number.EPSILON ) )
			$mol_assert_equal( false, $mol_schema_integer.check( Number.POSITIVE_INFINITY ) )
			$mol_assert_equal( false, $mol_schema_integer.check( Number.NEGATIVE_INFINITY ) )
			
			$mol_assert_equal( Number.MAX_SAFE_INTEGER, $mol_schema_integer.cast( Number.MAX_SAFE_INTEGER ) )
			$mol_assert_equal( 0, $mol_schema_integer.cast( Number.EPSILON ) )
			$mol_assert_equal( 0, $mol_schema_integer.cast( 1.5 ) )
			
			$mol_assert_equal( 0, $mol_schema_integer.guard( 0 ) )
			$mol_assert_fail( ()=> $mol_schema_integer.guard( '' ), 'Wrong type' )
			$mol_assert_fail( ()=> $mol_schema_integer.guard( Number.NaN ), 'Non finite' )
			$mol_assert_fail( ()=> $mol_schema_integer.guard( 1.5 ), 'Non integer' )
			
		},
		
		
	})
}
