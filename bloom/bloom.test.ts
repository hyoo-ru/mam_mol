namespace $ {
	$mol_test({
		
		'Add and check strings'() {
			
			const bloom = new $mol_bloom( 5 )
			$mol_assert_equal( bloom.has_str( 'Hello' ), 0 )
			$mol_assert_equal( bloom.has_str( 'World' ), 0 )
			$mol_assert_equal( bloom.has_str( 'Hello World' ), 0 )
			$mol_assert_equal( bloom.has_str( 'hello' ), 0 )
			$mol_assert_equal( bloom.has_str( 'world' ), 0 )
			
			bloom.add_str( 'Hello World' )
			$mol_assert_equal( bloom.has_str( 'Hello' ), 0 )
			$mol_assert_equal( bloom.has_str( 'World' ), 0 )
			$mol_assert_equal( bloom.has_str( 'Hello World' ), 1 )
			$mol_assert_equal( bloom.has_str( 'hello' ), 0 )
			$mol_assert_equal( bloom.has_str( 'world' ), 0 )
			
			bloom.add_str( 'Hello' )
			bloom.add_str( 'World' )
			$mol_assert_equal( bloom.has_str( 'Hello' ), 1 )
			$mol_assert_equal( bloom.has_str( 'World' ), 1 )
			$mol_assert_equal( bloom.has_str( 'hello' ), 0 )
			$mol_assert_equal( bloom.has_str( 'world' ), 0 )
			
		},
		
	})
}
