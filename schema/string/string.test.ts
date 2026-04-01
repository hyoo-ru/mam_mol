namespace $.$$ {
	$mol_test({
		
		"String schema"( $ ) {
			
			$mol_assert_equal( '$mol_schema_string', $mol_schema_string + '', $mol_key( $mol_schema_string ) )
			
			$mol_assert_equal( true, $mol_schema_string.check( 'foo' ) )
			$mol_assert_equal( false, $mol_schema_string.check( 123 ) )
			
			$mol_assert_equal( 'foo', $mol_schema_string.cast( 'foo' ) )
			$mol_assert_equal( '', $mol_schema_string.cast( 123 ) )
			
			$mol_assert_equal( 'foo', $mol_schema_string.guard( 'foo' ) )
			$mol_assert_fail( ()=> $mol_schema_string.guard( 123 ), 'Wrong type' )
			
		},
		
	})
}
