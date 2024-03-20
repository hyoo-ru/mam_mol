namespace $ {
	
	/** 16 byte */
	export function $mol_crypto_salt() {
		return $mol_crypto_native.getRandomValues(
			new Uint8Array( 16 )
		)
	}
	
	/** 16 byte */
	export const $mol_crypto_salt_once = new Uint8Array(
		[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6]
	)
	
}
