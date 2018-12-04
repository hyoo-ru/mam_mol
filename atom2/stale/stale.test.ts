namespace $ {

	$mol_test({

		'$mol_atom2_stale'( $ ) {

			let state = 1

			const monitor = new $.$mol_atom2
			monitor.calculate = ()=> {
				new $.$mol_after_frame( $mol_atom2_stale() )
				return state
			}
			$mol_assert_equal( monitor.get() , 1 )
			
			state = 2
			$mol_assert_equal( monitor.get() , 1 )
				
			$.$mol_after_mock_warp()
			$mol_assert_equal( monitor.get() , 2 )
			
			state = 3
			$mol_assert_equal( monitor.get() , 2 )
			
			monitor.destructor()
			$mol_assert_equal( monitor.value , undefined )
			
			$.$mol_after_mock_warp()
			$mol_assert_equal( monitor.value , undefined )
			
		} ,

	})

}
