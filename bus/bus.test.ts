namespace $ {
	$mol_test_mocks.push( $=> {
		class $mol_bus< Data > extends $.$mol_bus< Data > {
			send() {}
		}
		$.$mol_bus = $mol_bus
	} )
}
