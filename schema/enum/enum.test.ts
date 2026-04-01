namespace $.$$ {
	$mol_test({
		
		"Enum options"( $ ) {
			
			const Config = $mol_schema_enum([ 123, 'foo' ])
			
			$mol_assert_equal( '$mol_schema_enum<[123,"foo"]>', Config + '', $mol_key( Config ) )
			
			$mol_assert_equal( true, Config.check( 123 ) )
			$mol_assert_equal( true, Config.check( 'foo' ) )
			
			$mol_assert_equal( false, Config.check( true ) )
			$mol_assert_equal( false, Config.check( 321 ) )
			$mol_assert_equal( false, Config.check( 'bar' ) )
			
			$mol_assert_equal( 123, Config.cast( 123 ) )
			$mol_assert_equal( 'foo', Config.cast( 'foo' ) )
			$mol_assert_equal( 123, Config.cast( 'bar' ) )
			
			$mol_assert_equal( 123, Config.guard( 123 ) )
			$mol_assert_fail( ()=> Config.guard( 321 ), 'No one option' )
			
		},
		
	})
}
