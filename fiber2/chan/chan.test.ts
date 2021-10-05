namespace $ {
	$mol_test({
		
		'recalculation of cached values'( $ ) {
			
			class X extends $mol_object2 {

				@ $mol_fiber2_chan
				foo( next? : number ) {
					return next || 1
				}

				@ $mol_fiber2_chan
				bar() {
					return this.foo() + 1
				}

				@ $mol_fiber2_chan
				xxx() {
					return this.bar() + 1
				}

			}
			
			const x = new X
			x.$ = $

			$mol_assert_equal( x.bar() , 2 )
			$mol_assert_equal( x.xxx() , 3 )

			x.foo( 5 )
			$mol_assert_equal( x.xxx() , 7 )
			
		},

	})
}
