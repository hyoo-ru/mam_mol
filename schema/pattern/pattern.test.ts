namespace $.$$ {
	$mol_test({
		
		"String pattern schema"( $ ) {
			
			const Email = $mol_schema_pattern( /^.*@.*$/ )
			
			$mol_assert_equal( '$mol_schema_pattern</^.*@.*$/>', Email + '', $mol_key( Email ) )
			
			$mol_assert_equal( true, Email.check( 'foo@bar' ) )
			$mol_assert_equal( false, Email.check( 'foo' ) )
			$mol_assert_equal( false, Email.check( 123 ) )
			
			$mol_assert_equal( 'foo@bar', Email.cast( 'foo@bar' ) )
			$mol_assert_equal( '', Email.cast( 'foo' ) )
			$mol_assert_equal( '', Email.cast( 123 ) )
			
			$mol_assert_equal( 'foo@bar', Email.guard( 'foo@bar' ) )
			$mol_assert_fail( ()=> Email.guard( 'foo' ), 'Wrong string' )
			
		},
		
	})
}
