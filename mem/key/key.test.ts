module $ {
	
	$mol_test({
		
		'keyed reactive properties' ($) {
			$mol_fiber_warp()

			class Fib extends $mol_object2 {

				static $ = $

				@ $mol_mem_key
				static value( index : number , next? : number ) : number {
					if( next ) return next
					if( index < 2 ) return 1
					return this.value( index - 1 ) + this.value( index - 2 )
				}

			}

			$mol_assert_equal( Fib.value( 10 ) , 89 )

			Fib.value( 1 , 2 )
			$mol_assert_equal( Fib.value( 10 ) , 144 )

		} ,

		'cached property with simple key'($) {

			class X extends $mol_object2 {

				@ $mol_mem_key
				foo( id : number , next? : Number | null ) {
					if( next == null ) return new Number( 123 )
					return new Number( next )
				}

			}
			const x = new X
			x.$ = $

			// get
			$mol_assert_equal( x.foo( 0 ).valueOf() , 123 )
			$mol_assert_equal( x.foo( 0 ) , x.foo( 0 ) )
			$mol_assert_unique( x.foo( 0 ) , x.foo( 1 ) )

			// set
			x.foo( 0 , 321 )
			$mol_assert_equal( x.foo( 0 ).valueOf() , 321 )

			// reset
			x.foo( 0 , null )
			
			$mol_assert_equal( x.foo( 0 ).valueOf() , 123 )

		} ,

		'cached property with complex key'($) {

			class X extends $mol_object2 {
				
				@ $mol_mem_key
				foo( ids : number[] ) {
					return Math.random()
				}

			}
			const x = new X
			x.$ = $

			$mol_assert_equal( x.foo( [ 0 , 1 ] ) , x.foo( [ 0 , 1 ] ) )
			$mol_assert_unique( x.foo( [ 0 , 1 ] ) , x.foo( [ 0 , 2 ] ) )
		} ,

	})
	
}
