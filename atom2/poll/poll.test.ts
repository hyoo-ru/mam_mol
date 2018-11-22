namespace $ {

	$mol_test({

		'$mol_atom2_poll'( $ ) {

			let state = 1

			const monitor = $.$mol_atom2_poll( ()=> state )
			$mol_assert_equal( monitor.get() , 1 )
			
			state = 2
			$mol_assert_equal( monitor.get() , 1 )
				
			$.$mol_after_mock_warp()
			$mol_assert_equal( monitor.get() , 2 )
			
			state = 3
			$mol_assert_equal( monitor.get() , 2 )
			
			monitor.destructor()
			$mol_assert_equal( $mol_atom2_value( ()=> monitor.get() ) , undefined )
			
			$.$mol_after_mock_warp()
			$mol_assert_equal( $mol_atom2_value( ()=> monitor.get() ) , undefined )
			
			state = 4
			$mol_assert_equal( monitor.get() , 4 )

		} ,

	})

}
