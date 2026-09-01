namespace $ {
	
	$mol_test_mocks.push( $ => {
		class $mol_locale_mock extends $mol_locale {
			
			@ $mol_mem
			lang( next = 'en' ) { return next }
			
			@ $mol_mem_key
			static source( lang: string ) {
				return {}
			}
			
		}
		$.$mol_locale = $mol_locale_mock
	} )
	
}
