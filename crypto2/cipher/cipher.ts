namespace $ {
	export class $mol_crypto2_cipher extends $mol_crypto2_socket {
		
		static size_secret = 16
		
		static async generate() {
			
			const pair = await $mol_crypto_native.subtle.generateKey(
				"X25519",
				Boolean( 'extractable' ),
				[ 'deriveKey' ]
			).catch( $mol_crypto_restack ) as CryptoKeyPair
			
			const { x, d } = await $mol_crypto_native.subtle.exportKey( 'jwk', pair.privateKey ).catch( $mol_crypto_restack )
			return this.from( x + d! )
			
		}
		
		@ $mol_memo.method
		async nativePrivate() {
			
			return $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					crv: 'X25519',
					ext: true,
					kty: 'OKP',
					key_ops: [ 'deriveKey', 'deriveBits' ],
					x: this.toString(),
					d: this.toStringPrivate(),
				},
				"X25519",
				Boolean( 'extractable' ),
				[ 'deriveKey', 'deriveBits' ],
			).catch( $mol_crypto_restack )
			
		}
		
		asArrayPrivate() {
			return new Uint8Array( this.buffer, this.byteOffset + 32, 32 )
		}
		
		@ $mol_memo.method
		toStringPrivate() {
			return $mol_base64_url_encode( this.asArrayPrivate() )
		}
		
		@ $mol_memo.method
		socket() {
			return $mol_crypto2_socket.from( this.asArray() )
		}
		
		async secret( pub: $mol_crypto2_socket ) {
				
			return $mol_crypto_sacred.from( new Uint8Array(
				await $mol_crypto_native.subtle.deriveBits(
					{
						name: "X25519",
						public: await pub.native(),
					},
					await this.nativePrivate(),
					$mol_crypto_sacred.size * 8,
				).catch( $mol_crypto_restack )
			) )
			
		}
	
	}
}
