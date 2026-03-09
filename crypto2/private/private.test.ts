namespace $.$$ {
	$mol_test({
		
		async "Signing & encryption"( $ ) {
			
			const Alice = await $mol_crypto2_private.generate()
			const Bella = await $mol_crypto2_private.generate()

			const secretA = await Alice.cipher().secret( Bella.socket() )
			const secretB = await Bella.cipher().secret( Alice.socket() )
			$mol_assert_equal( secretA, secretB )

			const data = new Uint8Array([ 1, 2, 3 ])
			const nonce = $mol_crypto2_nonce()

			const closed = await secretA.encrypt( data, nonce )
			const digest = $mol_crypto_hash( closed )
			const sign = await Alice.signer().sign( digest )

			$mol_assert_equal( true, await Alice.auditor().verify( digest, sign ) )
			$mol_assert_equal( data, await secretA.decrypt( closed, nonce ) )
			
		},
		
		async "Serial & Deserial"( $ ) {
			
			const orig = await $mol_crypto2_private.generate()
			
			const bin = new Uint8Array([ ... orig.asArray(), ... orig.asArrayPrivate() ])
			const str = orig.toString() + orig.toStringPrivate()
			
			$mol_assert_equal(
				orig,
				$mol_crypto2_private.from( bin ),
				$mol_crypto2_private.from( str ),
			)

		},
		
	})
}
