namespace $ {
	$mol_test({
		
		async 'sizes'() {
			
			const cipher = await $mol_crypto_secret.generate()
			
			const key = await cipher.serial()
			$mol_assert_equal( key.byteLength, $mol_crypto_secret.size )
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const closed = await cipher.encrypt( data, salt )
			$mol_assert_equal( closed.byteLength, data.byteLength + $mol_crypto_secret.extra )
			
		},
		
		async 'decrypt self encrypted with auto generated key'() {
			
			const cipher = await $mol_crypto_secret.generate()
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const closed = await cipher.encrypt( data, salt )
			const opened = await cipher.decrypt( closed, salt )
			
			$mol_assert_like( data, new Uint8Array( opened ) )
			
		},
		
		async 'decrypt encrypted with exported auto generated key'() {
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const Alice = await $mol_crypto_secret.generate()
			const closed = await Alice.encrypt( data, salt )
			
			const Bob = await $mol_crypto_secret.from( await Alice.serial() )
			const opened = await Bob.decrypt( closed, salt )
			
			$mol_assert_like( data, new Uint8Array( opened ) )
			
		},
		
		async 'derivation from public & private keys'() {
			
			const A = await $mol_crypto_key_private.generate()
			const B = await $mol_crypto_key_private.generate()
			
			const AK = await $mol_crypto_secret.derive( A.toString(), B.public().toString() )
			const BK = await $mol_crypto_secret.derive( B.toString(), A.public().toString() )
			
			$mol_assert_like(
				new Uint8Array( await AK.serial() ),
				new Uint8Array( await BK.serial() ),
			)
			
		},
		
	})
}
