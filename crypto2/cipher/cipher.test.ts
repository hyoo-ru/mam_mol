namespace $ {
	$mol_test({
		
		async 'str & bin sizes'() {
			
			const cipher = await $$.$mol_crypto2_cipher.generate()
			const socket = cipher.socket()
			
			$mol_assert_equal( cipher.toStringPrivate().length, $mol_crypto2_cipher.size_str )
			$mol_assert_equal( socket.toString().length, $mol_crypto2_socket.size_str )
			
			$mol_assert_equal( cipher.asArrayPrivate().length, $mol_crypto2_cipher.size_bin )
			$mol_assert_equal( socket.asArray().length, $mol_crypto2_socket.size_bin )
			
			const secret = await cipher.secret( socket )
			$mol_assert_equal( secret.byteLength, $mol_crypto2_cipher.size_secret )
			
		},
		
		async 'Shared secret from public & private keys'() {
			
			const A = await $mol_crypto2_cipher.generate()
			const B = await $mol_crypto2_cipher.generate()
			
			const SA = await A.secret( B.socket() )
			const SB = await B.secret( A.socket() )
			
			$mol_assert_equal( SA.asArray(), SB.asArray() )
			
		},
		
	})
}
