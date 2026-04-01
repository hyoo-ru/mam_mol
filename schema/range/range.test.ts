namespace $.$$ {
	$mol_test({
		
		"Float range schema"( $ ) {
			
			const Range = $mol_schema_range( 4, 8 )
			
			$mol_assert_equal( true, Range.check( 5.5 ) )
			$mol_assert_equal( true, Range.check( 4 ) )
			$mol_assert_equal( true, Range.check( 8 ) )
			
			$mol_assert_equal( false, Range.check( 3 ) )
			$mol_assert_equal( false, Range.check( 9 ) )
			
			$mol_assert_equal( 4, Range.cast( 3 ) )
			$mol_assert_equal( 8, Range.cast( 9 ) )
			$mol_assert_equal( 4, Range.cast( Number.NaN ) )
			
			$mol_assert_equal( 5, Range.guard( 5 ) )
			$mol_assert_fail( ()=> Range.guard( 2 ), 'Too small' )
			$mol_assert_fail( ()=> Range.guard( 10 ), 'Too large' )
			$mol_assert_fail( ()=> Range.guard( {} ), 'Uncomparable type' )
			
		},
		
	})
}
