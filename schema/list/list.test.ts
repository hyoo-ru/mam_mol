namespace $.$$ {
	$mol_test({
		
		"Array schema"( $ ) {
			
			const Vector = $mol_schema_list( $mol_schema_float )
			
			$mol_assert_equal( '$mol_schema_list<$mol_schema_float>', Vector + '' )
			
			$mol_assert_equal( true, Vector.check( [] ) )
			$mol_assert_equal( true, Vector.check( [ 123 ] ) )
			$mol_assert_equal( false, Vector.check( [ 'foo' ] ) )
			
			$mol_assert_equal( [ 123 ], Vector.cast( [ 123 ] ) )
			$mol_assert_equal( [ 123, Number.NaN ], Vector.cast( [ 123, 'foo' ] ) )
			
			$mol_assert_equal( [], Vector.guard( [] ) )
			$mol_assert_equal( [ 123 ], Vector.guard( [ 123 ] ) )
			$mol_assert_fail( ()=> Vector.guard( 0 ), 'Non array' )
			$mol_assert_fail( ()=> Vector.guard( [ false ] ), 'Wrong item' )
			
		},
		
	})
}
