module $ {
	
	$mol_test({
		
		'reactive field' () {
			$mol_fiber_warp()

			class Test {

				@ $mol_atom2_field
				static source = 1

				@ $mol_atom2_field
				static get target() {
					return this.source + 1
				}
				
			}

			$mol_assert_equal( Test.target , 2 )

			Test.source = 2
			$mol_assert_equal( Test.target , 3 )

		} ,

	})
		
}
