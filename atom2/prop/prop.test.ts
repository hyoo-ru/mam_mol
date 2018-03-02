module $ {
	
	$mol_test({
		
		'simple reactive properties' () {
			$mol_fiber_warp()

			class Source {

				@ $mol_atom2_prop
				value( next = 1 ) {
					return next 
				}

			}

			const source = new Source

			class Target {

				@ $mol_atom2_prop
				value() {
					return source.value() + 1
				}
				
			}

			const target = new Target
			$mol_assert_equal( target.value() , 2 )

			source.value( 2 )
			$mol_assert_equal( target.value() , 3 )

		} ,

	})
	
}
