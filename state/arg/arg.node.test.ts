namespace $ {

	$mol_test_mocks.push( context => {
		class $mol_state_arg_mock extends $mol_state_arg {

			static $ = context
						
			@ $mol_mem
			static href( next? : string ) { return next || '' }
	
			@ $mol_action
			static go( next : { [ key : string ] : string | null } ) {
				this.href( this.link( next ) )
			}

		}
		context.$mol_state_arg = $mol_state_arg_mock
	} )
	
}
