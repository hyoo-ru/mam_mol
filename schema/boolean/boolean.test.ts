namespace $.$$ {
	$mol_test({
		
		"Boolean schema"( $ ) {
			
			$mol_assert_equal( '$mol_schema_boolean', $mol_schema_boolean + '', $mol_key( $mol_schema_boolean ) )
			
			$mol_assert_equal( true, $mol_schema_boolean.check( false ) )
			$mol_assert_equal( true, $mol_schema_boolean.check( true ) )
			$mol_assert_equal( false, $mol_schema_boolean.check( 'true' ) )
			$mol_assert_equal( false, $mol_schema_boolean.check( 0 ) )
			
			$mol_assert_equal( false, $mol_schema_boolean.cast( false ) )
			$mol_assert_equal( false, $mol_schema_boolean.cast( 'true' ) )
			
			$mol_assert_equal( false, $mol_schema_boolean.guard( false ) )
			$mol_assert_fail( ()=> $mol_schema_boolean.guard( null ), 'Wrong type' )
			
		},
		
	})
}
