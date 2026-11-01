namespace $ {
	$mol_test({

		async 'Sizes'() {

			const secret = $mol_crypto2_secret.make()
			$mol_assert_equal( secret.asArray().byteLength, $mol_crypto2_secret.size )
			
			const data = new Uint8Array([ 1, 2, 3 ])
			const nonce = $mol_crypto2_nonce()
			const closed = await secret.encrypt( data, nonce )
			$mol_assert_equal( closed.byteLength, data.byteLength )

		},

		'Wrong key size'() {

			$mol_assert_fail(
				()=> $mol_crypto2_secret.from( new Uint8Array( 8 ) ),
				'Wrong key size',
			)

		},

		async 'Decrypt self encrypted'() {

			const secret = $mol_crypto2_secret.make()
			const nonce = $mol_crypto2_nonce()
			const data = new Uint8Array([ 1, 2, 3 ])
			
			const closed = await secret.encrypt( data, nonce )
			$mol_assert_equal( closed.byteLength, 3 )
			
			const opened = await secret.decrypt( closed, nonce )
			$mol_assert_equal( opened, data )

		},

		async 'Decrypt encrypted with exported key'() {

			const data = new Uint8Array([ 1, 2, 3 ])
			const nonce = $mol_crypto2_nonce()

			const Alice = $mol_crypto2_secret.make()
			const closed = await Alice.encrypt( data, nonce )

			const Bob = $mol_crypto2_secret.from( Alice.asArray() )
			const opened = await Bob.decrypt( closed, nonce )

			$mol_assert_equal( data, opened )

		},

	})
}
