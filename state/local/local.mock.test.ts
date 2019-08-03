namespace $ {

	$mol_test_mocks.push( context => {
		class $mol_state_local_mock< Value > extends $mol_state_local< Value > {

			static state = {} as Record< string , any >
						
			@ $mol_mem_key
			static value< Value >( key : string , next = this.state[ key ] as Value ) {
				return this.state[ key ] = ( next || null )
			}

		}
		context.$mol_state_local = $mol_state_local_mock
	} )
	
}
