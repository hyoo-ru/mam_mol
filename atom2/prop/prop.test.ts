module $ {
	
	$mol_test({
		
		'Property method' () {

			class App extends $mol_object2 {

				@ $mol_atom2_prop
				static value( next = 1 ) { return next + 1 }

			}

			$mol_assert_equal( App.value() , 2 )

			App.value( 2 )
			$mol_assert_equal( App.value() , 3 )

		} ,

	})
	
}
