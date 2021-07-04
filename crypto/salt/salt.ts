namespace $ {
	
	/** 8 byte */
	export function $mol_crypto_salt() {
		return crypto.getRandomValues(
			new Uint8Array( 8 )
		)
	}
	
}
