namespace $.$$ {
	$mol_test({
		
		"Range intersection"( $ ) {
			
			const Narrow = $mol_schema_every([ $mol_schema_integer, $mol_schema_range( 1, 8 ), $mol_schema_range( 4, 10 ) ])
			
			$mol_assert_equal( '$mol_schema_every<[$mol_schema_integer,$mol_schema_range<1,8>,$mol_schema_range<4,10>]>', Narrow + '' )
			
			$mol_assert_equal( true, Narrow.check( 6 ) )
			$mol_assert_equal( true, Narrow.check( 4 ) )
			$mol_assert_equal( true, Narrow.check( 8 ) )
			
			$mol_assert_equal( false, Narrow.check( 3 ) )
			$mol_assert_equal( false, Narrow.check( 9 ) )
			$mol_assert_equal( false, Narrow.check( 5.5 ) )
			
			$mol_assert_equal( 4, Narrow.cast( 3 ) )
			$mol_assert_equal( 8, Narrow.cast( 9 ) )
			$mol_assert_equal( 4, Narrow.cast( '6' ) )
			
			$mol_assert_equal( 5, Narrow.guard( 5 ) )
			$mol_assert_fail( ()=> Narrow.guard( 2 ), 'Too small' )
			$mol_assert_fail( ()=> Narrow.guard( 10 ), 'Too large' )
			$mol_assert_fail( ()=> Narrow.guard( '' ), 'Wrong type' )
			
		},
		
	})
}
