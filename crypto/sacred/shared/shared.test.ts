namespace $ {
	$mol_test({

		async 'Shared secret from public & private keys'() {
			
			const A = await $mol_crypto_key_private.generate()
			const B = await $mol_crypto_key_private.generate()
			
			const SA = await $mol_crypto_sacred_shared( A, B.public() )
			const SB = await $mol_crypto_sacred_shared( B, A.public() )
			
			$mol_assert_equal( SA.asArray(), SB.asArray() )
			
		},
		
	})
}
