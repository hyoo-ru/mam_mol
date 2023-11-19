namespace $ {
	$mol_test({
		
		async 'str & bin sizes'() {
			
			const key_private = await $$.$mol_crypto_key_private.generate()
			const key_public = key_private.public()
			
			$mol_assert_equal( key_private.toString().length, $mol_crypto_key_private.size_str )
			$mol_assert_equal( key_public.toString().length, $mol_crypto_key_public.size_str )
			
			$mol_assert_equal( key_private.asArray().length, $mol_crypto_key_private.size_bin )
			$mol_assert_equal( key_public.asArray().length, $mol_crypto_key_public.size_bin )
			
			const data = new Uint8Array([ 1, 2, 3 ])
			const sign = await key_private.sign( data )
			$mol_assert_equal( sign.byteLength, $mol_crypto_key_private.size_sign )
			
		},
		
		async 'verify self signed with auto generated key'() {
			
			const Alice = await $$.$mol_crypto_key_private.generate()
			const data = new Uint8Array([ 1, 2, 3 ])
			const sign = await Alice.sign( data )
			
			$mol_assert_ok( await Alice.public().verify( data, sign ) )
			
		},
		
		async 'verify signed with str exported auto generated key'() {
			
			const Alice = await $$.$mol_crypto_key_private.generate()
			const data = new Uint8Array([ 1, 2, 3 ])
			
			const Bella = $mol_crypto_key_private.from( Alice.toString() )
			const sign = await Bella.sign( data )
			
			const Catie = $mol_crypto_key_public.from( Alice.public().toString() )
			$mol_assert_ok( await Catie.verify( data, sign ) )
			
			const Diana = $mol_crypto_key_public.from( Alice.toString() )
			$mol_assert_ok( await Diana.verify( data, sign ) )
			
		},
		
		async 'verify signed with bin exported auto generated key'() {
			
			const Alice = await $$.$mol_crypto_key_private.generate()
			const data = new Uint8Array([ 1, 2, 3 ])
			
			const Bella = $mol_crypto_key_private.from( Alice.asArray() )
			const sign = await Bella.sign( data )
			
			const Catie = $mol_crypto_key_public.from( Alice.public().asArray() )
			$mol_assert_ok( await Catie.verify( data, sign ) )
			
			const Diana = $mol_crypto_key_public.from( Alice.asArray() )
			$mol_assert_ok( await Diana.verify( data, sign ) )
			
		},
		
	})
}
