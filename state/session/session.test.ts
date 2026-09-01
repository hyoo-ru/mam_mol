namespace $ {
	
	$mol_test({
		
		'null by default' () {
			const key = String( Math.random() )
			
			$mol_assert_equal( $mol_state_session.value( key ) , null )
		} ,
		
		'storing' () {
			const key = String( Math.random() )
			
			$mol_state_session.value( key , '$mol_state_session_test' )
			$mol_assert_equal( $mol_state_session.value( key ) , '$mol_state_session_test' )
			
			$mol_state_session.value( key , null )
			$mol_assert_equal( $mol_state_session.value( key ) , null )
		} ,
		
	})
	
}
