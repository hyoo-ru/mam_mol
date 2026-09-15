namespace $ {
	/** x25519 public key for data encryption. */
	export class $mol_crypto2_socket extends $mol_crypto2_key {
		
		/** Native WebAPI public key. */
		@ $mol_memo.method
		async native() {
			
			return await $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					crv: 'X25519',
					ext: true,
					kty: 'OKP',
					key_ops: [],
					x: this.toString(),
				},
				"X25519",
				true,
				[],
			).catch( $mol_crypto_restack )
			
		}
		
	}
}
