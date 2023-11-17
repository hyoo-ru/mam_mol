namespace $ {
	$mol_test({
		
		async 'str sizes'() {
			
			const pair = await $$.$mol_crypto_auditor_pair()
			
			const key_public = await pair.public.serial()
			$mol_assert_equal( key_public.length, $mol_crypto_auditor_public.size_str )
			
			const key_private = await pair.private.serial()
			$mol_assert_equal( key_private.length, $mol_crypto_auditor_private.size_str )
			
			const data = new Uint8Array([1,2,3])
			const sign = await pair.private.sign( data )
			$mol_assert_equal( sign.byteLength, $mol_crypto_auditor_sign_size )
			
		},
		
		async 'bin sizes'() {
			
			const pair = await $$.$mol_crypto_auditor_pair()
			
			const key_public = await pair.public.toArray()
			$mol_assert_equal( key_public.length, $mol_crypto_auditor_public.size_bin )
			
			const key_private = await pair.private.toArray()
			$mol_assert_equal( key_private.length, $mol_crypto_auditor_private.size_bin )
			
		},
		
		async 'verify self signed with auto generated key'() {
			
			const auditor = await $$.$mol_crypto_auditor_pair()
			const data = new Uint8Array([1,2,3])
			const sign = await auditor.private.sign( data )
			
			$mol_assert_ok( await auditor.public.verify( data, sign ) )
			
		},
		
		async 'verify signed with str exported auto generated key'() {
			
			const pair = await $$.$mol_crypto_auditor_pair()
			const data = new Uint8Array([1,2,3])
			
			const Alice = await $mol_crypto_auditor_private.from( await pair.private.serial() )
			const sign = await Alice.sign( data )
			
			const Bob = await $mol_crypto_auditor_public.from( await pair.public.serial() )
			$mol_assert_ok( await Bob.verify( data, sign ) )
			
		},
		
		async 'verify signed with bin exported auto generated key'() {
			
			const pair = await $$.$mol_crypto_auditor_pair()
			const data = new Uint8Array([1,2,3])
			
			const Alice = await $mol_crypto_auditor_private.from( await pair.private.toArray() )
			const sign = await Alice.sign( data )
			
			const Bob = await $mol_crypto_auditor_public.from( await pair.public.toArray() )
			$mol_assert_ok( await Bob.verify( data, sign ) )
			
		},
		
		async 'take public key from private str'() {
			
			const pair = await $$.$mol_crypto_auditor_pair()
			const data = new Uint8Array([1,2,3])
			
			const Alice = pair.private
			const sign = await Alice.sign( data )
			
			const Bob = await pair.private.public()
			const Carol = await $mol_crypto_auditor_public.from( await pair.private.serial() )
			
			$mol_assert_ok( await Bob.verify( data, sign ) )
			$mol_assert_ok( await Carol.verify( data, sign ) )
			
		},
		
		async 'take public key from private bin'() {
			
			const pair = await $$.$mol_crypto_auditor_pair()
			const data = new Uint8Array([1,2,3])
			
			const Alice = pair.private
			const sign = await Alice.sign( data )
			
			const Bob = await pair.private.public()
			const Carol = await $mol_crypto_auditor_public.from( await pair.private.toArray() )
			
			$mol_assert_ok( await Bob.verify( data, sign ) )
			$mol_assert_ok( await Carol.verify( data, sign ) )
			
		},
		
	})
}
