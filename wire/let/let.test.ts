namespace $ {
	$mol_test({
		
		'define as methods'() {
			
			const { foo, bar, lol } = $mol_wire_let({
				foo( next = 1 ) { return next },
				bar() { return this.foo() + 1 },
				lol( next?: number ) { return this.foo( next ) },
			})
			
			$mol_assert_equal( foo(), 1 )
			$mol_assert_equal( bar(), 2 )
			
			$mol_assert_equal( foo(5), 5 )
			$mol_assert_equal( bar(), 6 )
			
			$mol_assert_equal( lol(10), 10 )
			$mol_assert_equal( bar(), 11 )
			
		},
		
		'define as closures'() {
			
			const { foo, bar, lol } = $mol_wire_let({
				foo: ( next = 1 )=> next,
				bar: ()=> foo() + 1,
				lol: ( next?: number )=> foo( next ),
			})
			
			$mol_assert_equal( foo(), 1 )
			$mol_assert_equal( bar(), 2 )
			
			$mol_assert_equal( foo(5), 5 )
			$mol_assert_equal( bar(), 6 )
			
			$mol_assert_equal( lol(10), 10 )
			$mol_assert_equal( bar(), 11 )
			
		},
		
	})
}


