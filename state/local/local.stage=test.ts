$mol_test( test => {
	
	var key = '$mol_state_local_test:' + Math.random()
	test.equal( $mol_state_local.value( key ) , null )
	
	$mol_state_local.value( key , 123 )
	test.equal( $mol_state_local.value( key ) , 123 )
	
	$mol_state_local.value( key , null )
	test.equal( $mol_state_local.value( key ) , null )
	
} )
