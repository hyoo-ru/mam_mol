namespace $ {

	$mol_test_mocks.push( context => {
		class $mol_state_arg_mock extends $mol_state_arg {
						
			@ $mol_mem
			static href( next? : string ) { return next || '' }
	
		}
		context.$mol_state_arg = $mol_state_arg_mock
	} )
	
}
