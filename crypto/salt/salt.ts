namespace $ {
	
	/** 8 byte */
	export function $mol_crypto_salt() {
		return $mol_crypto_native.getRandomValues(
			new Uint8Array( 12 )
		)
	}
	
}
