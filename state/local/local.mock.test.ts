namespace $ {

	$mol_test_mocks.push( context => {
		class $mol_state_local_mock< Value > extends $mol_state_local< Value > {
						
			@ $mol_mem_key
			static value< Value >( key : string , next? : Value ) { return next }

		}
		context.$mol_state_local = $mol_state_local_mock
	} )
	
}
