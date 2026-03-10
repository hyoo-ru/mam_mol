namespace $ {
	/** Ed25519 private key for data signing. */
	export class $mol_crypto2_signer extends $mol_crypto2_auditor {
		
		static size_sign = 64
		
		/** Generates new Signer. */
		static async generate() {
			
			const pair = await $mol_crypto_native.subtle.generateKey(
				"Ed25519",
				Boolean( 'extractable' ),
				[ 'sign', 'verify' ]
			).catch( $mol_crypto_restack )
			
			const { x, d } = await $mol_crypto_native.subtle.exportKey( 'jwk', pair.privateKey ).catch( $mol_crypto_restack )
			return this.from( x + d! )
			
		}
		
		/** Native WebAPI private key. */
		@ $mol_memo.method
		async nativePrivate() {
			
			return await $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					crv: "Ed25519",
					ext: true,
					key_ops: [ 'sign' ],
					kty: "OKP",
					x: this.toString(),
					d: this.toStringPrivate(),
				},
				"Ed25519",
				Boolean( 'extractable' ),
				[ 'sign' ],
			).catch( $mol_crypto_restack )
			
		}
		
		/** Array view of private part. */
		asArrayPrivate() {
			return new Uint8Array( this.buffer, this.byteOffset + 32, 32 )
		}
		
		/** String representation of private part. */
		@ $mol_memo.method
		toStringPrivate() {
			return $mol_base64_url_encode( this.asArrayPrivate() )
		}
		
		/** Returns Auditor from this Signer. */
		@ $mol_memo.method
		auditor() {
			return $mol_crypto2_auditor.from( this.asArray() )
		}
		
		/** Makes Signature for data. */
		async sign( data: BufferSource ) {
			
			return new Uint8Array( await $mol_crypto_native.subtle.sign(
				"Ed25519",
				await this.nativePrivate(),
				data
			).catch( $mol_crypto_restack ) )
			
		}
		
	}
}
