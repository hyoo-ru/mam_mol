namespace $.$$ {
	$mol_test({
		
		"Optional value"( $ ) {
			
			const Config = $mol_schema_maybe( $mol_schema_string )
			
			$mol_assert_equal( '$mol_schema_maybe<$mol_schema_string>', Config + '' )
			
			$mol_assert_equal( true, Config.check( 'foo' ) )
			$mol_assert_equal( true, Config.check( undefined ) )
			$mol_assert_equal( true, Config.check( null ) )
			$mol_assert_equal( false, Config.check( 0 ) )
			
			$mol_assert_equal( 'foo', Config.cast( 'foo' ) )
			$mol_assert_equal( undefined, Config.cast( undefined ) )
			$mol_assert_equal( null, Config.cast( null ) )
			$mol_assert_equal( undefined, Config.cast( 0 ) )
			
			$mol_assert_equal( 'foo', Config.guard( 'foo' ) )
			$mol_assert_fail( ()=> Config.guard( 123 ), 'No one variant' )
			
		},
		
	})
}
