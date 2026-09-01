namespace $.$$ {
	$mol_test({
		
		"BigInt schema"( $ ) {
			
			$mol_assert_equal( '$mol_schema_bigint', $mol_schema_bigint + '', $mol_key( $mol_schema_bigint ) )
			
			$mol_assert_equal( true, $mol_schema_bigint.check( 0n ) )
			$mol_assert_equal( false, $mol_schema_bigint.check( 0 ) )
			
			$mol_assert_equal( 1n, $mol_schema_bigint.cast( 1n ) )
			$mol_assert_equal( 1n, $mol_schema_bigint.cast( 1 ) )
			
			$mol_assert_equal( 0n, $mol_schema_bigint.guard( 0n ) )
			$mol_assert_fail( ()=> $mol_schema_bigint.guard( 1 ), 'Wrong type' )
			
		},
		
	})
}
