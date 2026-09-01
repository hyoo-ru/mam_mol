namespace $ {
	$mol_test({
		
		async 'sizes'() {
			
			const secret = await $mol_crypto_secret.generate()
			
			const key = await secret.serial()
			$mol_assert_equal( key.byteLength, $mol_crypto_secret.size )
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const closed = await secret.encrypt( data, salt )
			$mol_assert_equal( closed.byteLength, 16 )
			
		},
		
		async 'decrypt self encrypted with auto generated key'() {
			
			const secret = await $mol_crypto_secret.generate()
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const closed = await secret.encrypt( data, salt )
			const opened = await secret.decrypt( closed, salt )
			
			$mol_assert_equal( data, opened )
			
		},
		
		async 'decrypt encrypted with exported auto generated key'() {
			
			const data = new Uint8Array([1,2,3])
			const salt = $mol_crypto_salt()
			
			const Alice = await $mol_crypto_secret.generate()
			const closed = await Alice.encrypt( data, salt )
			
			const Bob = await $mol_crypto_secret.from( await Alice.serial() )
			const opened = await Bob.decrypt( closed, salt )
			
			$mol_assert_equal( data, opened )
			
		},
		
		async 'derivation from public & private keys'() {
			
			const A = await $mol_crypto_key_private.generate()
			const B = await $mol_crypto_key_private.generate()
			
			const AK = await $mol_crypto_secret.derive( A.toString(), B.public().toString() )
			const BK = await $mol_crypto_secret.derive( B.toString(), A.public().toString() )
			
			$mol_assert_equal(
				await AK.serial(),
				await BK.serial(),
			)
			
		},
		
		async 'derivation from passwod'() {
			
			const data = new Uint8Array([1,2,3])
			
			const salt1 = $mol_crypto_salt()
			const secret = await $mol_crypto_secret.pass( 'hello', salt1 )
			
			const salt2 = $mol_crypto_salt()
			const closed = await secret.encrypt( data, salt2 )
			const opened = await secret.decrypt( closed, salt2 )
			
			$mol_assert_equal( data, opened )
			
		},
		
	})
}
