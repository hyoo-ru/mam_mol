namespace $ {
	
	/** Slow conversion any password string to secret key. */
	export async function $mol_crypto_sacred_pass( pass: string, salt: Uint8Array ) {
			
		const raw = await $mol_crypto_native.subtle.importKey(
			"raw",
			$mol_charset_encode( pass ),
			"PBKDF2",
			false,
			[ "deriveKey" ],
		)
		
		const hard = await $mol_crypto_native.subtle.deriveKey(
			{
				name: "PBKDF2",
				salt,
				iterations: 10_000,
				hash: "SHA-256",
			},
			raw,
			{
				name: 'AES-CBC',
				length: 128,
			},
			Boolean( 'extractable' ),
			[ 'encrypt', 'decrypt' ],
		)
		
		return $mol_crypto_sacred.from_native( hard )
		
	}
	
}
