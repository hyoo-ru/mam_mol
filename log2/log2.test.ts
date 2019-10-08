namespace $ {

	$mol_test_mocks.push( $ => {
		$.$mol_log2 = class extends $mol_log2 {
			static current = new $mol_log2( '$mol_log2_mock' , [] )
		}
	} )

}
