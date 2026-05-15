namespace $.$$ {
	$mol_test({
		
		"Cache of instance schema"( $ ) {
			
			$mol_assert_equal( $mol_schema_instance( Uint8Array ), $mol_schema_instance( Uint8Array ) )
			$mol_assert_unique( $mol_schema_instance( Uint8Array ), $mol_schema_instance( Int8Array ) )
			
		},
		
		"Class instance schema"( $ ) {
			
			const Blob = $mol_schema_instance( Uint8Array )
			
			$mol_assert_equal( '$mol_schema_instance<Uint8Array>', Blob + '', $mol_key( Blob ) )
			
			$mol_assert_equal( true, Blob.check( new Uint8Array ) )
			$mol_assert_equal( false, Blob.check( new Int8Array ) )
			$mol_assert_equal( false, Blob.check( null ) )
			
			$mol_assert_equal( new Uint8Array([ 0, 1 ]), Blob.cast( new Uint8Array([ 0, 1 ]) ) )
			$mol_assert_fail( ()=> Blob.cast( new Int8Array ), 'Wrong class' )
			
			$mol_assert_equal( new Uint8Array, Blob.guard( new Uint8Array ) )
			$mol_assert_fail( ()=> Blob.guard( new Int8Array ), 'Wrong class' )
			
		},
		
		"Boxed instance schema"( $ ) {
			
			const Str = $mol_schema_instance( String )
			
			$mol_assert_equal( '$mol_schema_instance<String>', Str + '', $mol_key( Str ) )
			
			$mol_assert_equal( true, Str.check( Object( '' ) ) )
			$mol_assert_equal( true, Str.check( '' ) )
			$mol_assert_equal( true, Object('') instanceof Str )
			
		},
		
		"Schema instance schema"( $ ) {
			
			const Str = $mol_schema_instance( $mol_schema_instance( String ) )
			
			$mol_assert_equal( '$mol_schema_instance<String>', Str + '', $mol_key( Str ) )
			
			$mol_assert_equal( true, Str.check( Object( '' ) ) )
			$mol_assert_equal( true, Str.check( '' ) )
			$mol_assert_equal( true, Object('') instanceof Str )
			
		},
		
	})
}
