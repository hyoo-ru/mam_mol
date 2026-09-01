namespace $ {
	$mol_test( {
		
		'local get set delete'() {
					
			var key = '$mol_state_local_test:' + Math.random()
			$mol_assert_equal( $mol_state_local.value( key ) , null )
			
			$mol_state_local.value( key , 123 )
			$mol_assert_equal( $mol_state_local.value( key ) , 123 )
			
			$mol_state_local.value( key , null )
			$mol_assert_equal( $mol_state_local.value( key ) , null )
		} ,
		
	} )
}
