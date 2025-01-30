namespace $ {
	$mol_test({
		
		async 'Sizes'() {
			
			const secret = $mol_crypto_sacred.make()
			
			const key = secret.asArray()
			$mol_assert_equal( key.byteLength, $mol_crypto_sacred.size )
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const closed = await secret.encrypt( data, salt )
			$mol_assert_equal( closed.byteLength, $mol_crypto_sacred.size )
			
			const self_closed = await secret.close( secret, salt )
			$mol_assert_equal( self_closed.byteLength, $mol_crypto_sacred.size )
			
		},
		
		async 'Decrypt self encrypted'() {
			
			const secret = $mol_crypto_sacred.make()
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const closed = await secret.encrypt( data, salt )
			const opened = await secret.decrypt( closed, salt )
			
			$mol_assert_equal( data, opened )
			
		},
		
		async 'Decrypt encrypted with exported key'() {
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const Alice = $mol_crypto_sacred.make()
			const closed = await Alice.encrypt( data, salt )
			
			const Bob = $mol_crypto_sacred.from( Alice.asArray() )
			const opened = await Bob.decrypt( closed, salt )
			
			$mol_assert_equal( data, opened )
			
		},
		
	})
}
