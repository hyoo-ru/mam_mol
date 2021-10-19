namespace $ {
	$mol_test({
		
		'Cached channel' ($) {

			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_fiber2_chan
				static value( next = 1 ) { return next + 1 }

			}

			$mol_assert_equal( App.value() , 2 )

			App.value( 2 )
			$mol_assert_equal( App.value() , 3 )

		},

		'Lazy recalculation of cached values'( $ ) {
			
			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_fiber2_chan
				static xxx( next? : number ) {
					return next || 1
				}

				@ $mol_fiber2_chan
				static yyy() {
					return this.xxx() + 1
				}

				@ $mol_fiber2_chan
				static zzz() {
					return this.yyy() + 1
				}

			}
			
			$mol_assert_equal( App.yyy() , 2 )
			$mol_assert_equal( App.zzz() , 3 )

			App.xxx( 5 )
			$mol_assert_equal( App.zzz() , 7 )
			
		},

		// https://github.com/nin-jin/slides/tree/master/reactivity
		'Dupes: Equality'( $ ) {
			
			let counter = 0
			
			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_fiber2_chan
				static foo( next? : { numbs: number[] } ) {
					return next ?? { numbs: [ 1 ] }
				}

				@ $mol_fiber2_chan
				static bar() {
					return { ... this.foo(), count: ++ counter }
				}

			}
			
			$mol_assert_like( App.bar() , { numbs: [ 1 ], count: 1 } )

			App.foo({ numbs: [ 1 ] })
			$mol_assert_like( App.bar() , { numbs: [ 1 ], count: 1 } )
			
			App.foo({ numbs: [ 2 ] })
			$mol_assert_like( App.bar() , { numbs: [ 2 ], count: 2 } )
			
		},

		// https://github.com/nin-jin/slides/tree/master/reactivity
		'Cycle: Fail'( $ ) {
		
			class App extends $mol_object {
		
				static $ = $
				
				@ $mol_fiber2_chan
				static foo() : number {
					return this.bar() + 1
				}
		
				@ $mol_fiber2_chan
				static bar() : number {
					return this.foo() + 1
				}
		
			}
		
			$mol_assert_fail( ()=> App.foo(), 'Circular subscription' )

		} ,

	})
}
