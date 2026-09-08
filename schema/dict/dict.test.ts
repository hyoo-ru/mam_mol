namespace $ {
	$mol_test({
		
		"Cache of dict schema"( $ ) {
			
			$mol_assert_equal( $mol_schema_dict([ $mol_schema_string, $mol_schema_float ]), $mol_schema_dict([ $mol_schema_string, $mol_schema_float ]) )
			$mol_assert_unique( $mol_schema_dict([ $mol_schema_string, $mol_schema_float ]), $mol_schema_dict([ $mol_schema_string, $mol_schema_string ]) )
			
		},
		
		"Dictionary schema"( $ ) {
			
			const Flags = $mol_schema_dict([ $mol_schema_pattern( /^[a-z]+$/ ), $mol_schema_boolean ])
			
			$mol_assert_equal( true, Flags.check( {} ) )
			$mol_assert_equal( true, Flags.check( { foo: false } ) )
			$mol_assert_equal( false, Flags.check( { f00: false } ) )
			$mol_assert_equal( false, Flags.check( [] ) )
			$mol_assert_equal( false, Flags.check( { foo: 0 } ) )
			
			$mol_assert_equal( { foo: false }, Flags.cast({ foo: false, f00: true }) )
			$mol_assert_equal( { foo: false }, Flags.cast({ foo: 123 }) )
			
			$mol_assert_equal( {}, Flags.guard( {} ) )
			$mol_assert_equal( { foo: false }, Flags.guard({ foo: false }) )
			$mol_assert_fail( ()=> Flags.guard({ foo: 123 }), 'Wrong val' )
			$mol_assert_fail( ()=> Flags.guard({ f00: 123 }), 'Wrong key' )
			
		},
		
	})
}
