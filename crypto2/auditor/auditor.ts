namespace $ {
	/** Ed25519 public key for sign verifying. */
	export class $mol_crypto2_auditor extends $mol_crypto2_key {
		
		/** Native WebAPI public key. */
		@ $mol_memo.method
		async native() {
			
			return $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					crv: "Ed25519",
					ext: true,
					key_ops: [ 'verify' ],
					kty: "OKP",
					x: this.toString(),
				},
				"Ed25519",
				Boolean( 'extractable' ),
				[ 'verify' ],
			).catch( $mol_crypto_restack )
			
		}
		
		/** Verifies signature of data. */
		async verify( data: BufferSource, sign: BufferSource ) {
			
			return await $mol_crypto_native.subtle.verify(
				"Ed25519",
				await this.native(),
				sign,
				data,
			).catch( $mol_crypto_restack )
			
		}
		
	}
}
