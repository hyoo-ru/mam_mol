namespace $ {

	$mol_test({

		'$mol_atom2_poll'( $ ) {

			let state = 1

			const digest = $.$mol_atom2_poll( ()=> state )
			$mol_assert_equal( digest.get() , 1 )
			
			state = 2
			$mol_assert_equal( digest.get() , 1 )
				
			$.$mol_after_mock_warp()
			$mol_assert_equal( digest.get() , 2 )
			
			state = 3
			$mol_assert_equal( digest.get() , 2 )
			
			digest.destructor()
			$mol_assert_equal( $mol_atom2_value( ()=> digest.get() ) , undefined )
			
			$.$mol_after_mock_warp()
			$mol_assert_equal( $mol_atom2_value( ()=> digest.get() ) , undefined )
			
			state = 4
			$mol_assert_equal( digest.get() , 4 )

		} ,

	})

}
