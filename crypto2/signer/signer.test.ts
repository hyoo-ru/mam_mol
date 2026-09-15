namespace $ {
	$mol_test({
		
		async 'str & bin sizes'() {
			
			const signer = await $$.$mol_crypto2_signer.generate()
			const auditor = signer.auditor()
			
			$mol_assert_equal( signer.toStringPrivate().length, $mol_crypto2_signer.size_str )
			$mol_assert_equal( auditor.toString().length, $mol_crypto2_auditor.size_str )
			
			$mol_assert_equal( signer.asArrayPrivate().length, $mol_crypto2_signer.size_bin )
			$mol_assert_equal( auditor.asArray().length, $mol_crypto2_auditor.size_bin )
			
			const data = new Uint8Array([ 1, 2, 3 ])
			const sign = await signer.sign( data )
			$mol_assert_equal( sign.byteLength, $mol_crypto2_signer.size_sign )
			
		},
		
		async 'verify self signed with auto generated key'() {
			
			const Alice = await $$.$mol_crypto2_signer.generate()
			const data = new Uint8Array([ 1, 2, 3 ])
			const sign = await Alice.sign( data )
			
			$mol_assert_equal( true, await Alice.auditor().verify( data, sign ) )
			
		},
		
		async 'verify signed with str exported auto generated key'() {
			
			const Alice = await $$.$mol_crypto2_signer.generate()
			const data = new Uint8Array([ 1, 2, 3 ])
			
			const Bella = $mol_crypto2_signer.from( Alice.toString() + Alice.toStringPrivate() )
			const sign = await Bella.sign( data )
			
			const Catie = $mol_crypto2_auditor.from( Alice.auditor().toString() )
			$mol_assert_equal( true, await Catie.verify( data, sign ) )
			
			const Diana = $mol_crypto2_auditor.from( Alice.toString() )
			$mol_assert_equal( true, await Diana.verify( data, sign ) )
			
		},
		
		async 'verify signed with bin exported auto generated key'() {
			
			const Alice = await $$.$mol_crypto2_signer.generate()
			const data = new Uint8Array([ 1, 2, 3 ])
			
			const Bella = $mol_crypto2_signer.from( new Uint8Array([ ... Alice.asArray(), ... Alice.asArrayPrivate() ]) )
			const sign = await Bella.sign( data )
			
			const Catie = $mol_crypto2_auditor.from( Alice.auditor().asArray() )
			$mol_assert_equal( true, await Catie.verify( data, sign ) )
			
			const Diana = $mol_crypto2_auditor.from( Alice.asArray() )
			$mol_assert_equal( true, await Diana.verify( data, sign ) )
			
		},
		
	})
}
