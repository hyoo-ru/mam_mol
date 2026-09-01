namespace $ {
	$mol_test({
		
		async 'sizes'() {
			
			const pair = await $$.$mol_crypto_cipher_pair()
			
			const key_private = await pair.private.serial()
			$mol_assert_ok( key_private!.byteLength > 630 )
			$mol_assert_ok( key_private!.byteLength < 640 )
			
			const key_public = await pair.public.serial()
			$mol_assert_equal( key_public!.byteLength, $mol_crypto_cipher_public.size )
			
			const data = new Uint8Array([1,2,3])
			const closed = await pair.public.encrypt( data )
			$mol_assert_equal( closed.byteLength, $mol_crypto_cipher_ecrypted_size )
			
		},
		
		async 'decrypt self encrypted with auto generated key'() {
			
			const pair = await $$.$mol_crypto_cipher_pair()
			const data = new Uint8Array([1,2,3])
			
			const closed = await pair.public.encrypt( data )
			const opened = await pair.private.decrypt( closed )
			
			$mol_assert_like( data, new Uint8Array( opened ) )
			
		},
		
		async 'decrypt encrypted with exported auto generated key'() {
			
			const pair = await $$.$mol_crypto_cipher_pair()
			const data = new Uint8Array([1,2,3])
			
			const Alice = await $mol_crypto_cipher_public.from( await pair.public.serial() )
			const closed = await Alice.encrypt( data )
			
			const Bob = await $mol_crypto_cipher_private.from( await pair.private.serial() )
			const opened = await Bob.decrypt( closed )
			
			$mol_assert_like( data, new Uint8Array( opened ) )
			
		},
		
	})
}
