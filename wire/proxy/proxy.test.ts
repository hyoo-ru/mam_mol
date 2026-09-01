namespace $.$$ {
	$mol_test({
		
		"Deep property change"( $ ) {
			
			const source = $mol_wire_proxy( 'source', {
				foo: {
					bar: 123,
				}
			})
			
			const { res } = $mol_wire_let({
				res() { return source.foo.bar }
			})
			
			$mol_assert_equal( res(), 123 )
			
			source.foo.bar = 321
			$mol_assert_equal( res(), 321 )
			
		},
		
		"Deep property add/remove"( $ ) {
			
			const source = $mol_wire_proxy( 'source', {
				foo: {
					bar: 123,
				} as any
			})
			
			const { exists, props } = $mol_wire_let({
				exists() { return 'bar' in source.foo },
				props() { return Object.keys( source.foo ) },
			})
			
			$mol_assert_equal( exists(), true )
			$mol_assert_equal( props(), [ 'bar' ] )
			
			delete source.foo.bar
			$mol_assert_equal( exists(), false )
			$mol_assert_equal( props(), [] )
			
			Object.defineProperty( source.foo, 'bar', { value: 'xxx', enumerable: true } )
			$mol_assert_equal( exists(), true )
			$mol_assert_equal( props(), [ 'bar' ] )
			
		},
		
		"Deep property change to equal"( $ ) {
			
			const source = $mol_wire_proxy( 'source', {
				foo: {
					bar: 123,
				}
			})
			
			let count = 0
			
			const { res } = $mol_wire_let({
				res() {
					++ count
					return source.foo.bar
				}
			})
			
			res(); $mol_assert_equal( count, 1 )
			res(); $mol_assert_equal( count, 1 )
			
			source.foo = { bar: 123 }
			res(); $mol_assert_equal( count, 1 )
			
			source.foo = { bar: 321 }
			res(); $mol_assert_equal( count, 2 )
			
		},
		
	})
}
