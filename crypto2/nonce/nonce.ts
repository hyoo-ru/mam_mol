namespace $ {
	
	/** 16 unique bytes. */
	export function $mol_crypto2_nonce() {
		return $mol_crypto_native.getRandomValues(
			new Uint8Array( 16 )
		)
	}
	
}
