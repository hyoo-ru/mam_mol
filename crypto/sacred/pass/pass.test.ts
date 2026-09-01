namespace $ {
	$mol_test({
		
		async 'Derivation from password'() {
			
			const data = new Uint8Array([1,2,3])
			
			const salt1 = $mol_crypto_salt()
			const secret1 = await $mol_crypto_sacred_pass( 'hello', salt1 )
			const secret2 = await $mol_crypto_sacred_pass( 'hello', salt1 )
			
			const salt2 = $mol_crypto_salt()
			const closed = await secret1.encrypt( data, salt2 )
			const opened = await secret2.decrypt( closed, salt2 )
			
			$mol_assert_equal( data, opened )
			
		},
		
	})
}
