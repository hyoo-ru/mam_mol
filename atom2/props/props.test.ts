module $ {
	
	$mol_test({
		
		'keyed reactive properties' () {
			$mol_fiber_warp()

			class Fib extends $mol_object2 {

				@ $mol_atom2_props
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

	})
	
}
