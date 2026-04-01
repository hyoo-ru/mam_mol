namespace $.$$ {
	$mol_test({
		
		"Some variant"( $ ) {
			
			const Config = $mol_schema_some([ $mol_schema_float, $mol_schema_string ])
			
			$mol_assert_equal( '$mol_schema_some<[$mol_schema_float,$mol_schema_string]>', Config + '' )
			
			$mol_assert_equal( true, Config.check( 123 ) )
			$mol_assert_equal( true, Config.check( 'foo' ) )
			$mol_assert_equal( false, Config.check( true ) )
			
			$mol_assert_equal( 123, Config.cast( 123 ) )
			$mol_assert_equal( 'foo', Config.cast( 'foo' ) )
			$mol_assert_equal( Number.NaN, Config.cast( true ) )
			
			$mol_assert_equal( 123, Config.guard( 123 ) )
			$mol_assert_fail( ()=> Config.guard( false ), 'No one variant' )
			
		},
		
	})
}
