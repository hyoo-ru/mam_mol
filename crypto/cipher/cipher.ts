namespace $ {
	
	const algorithm = {
		name: 'RSA-OAEP',
		modulusLength: 1024,
		publicExponent: new Uint8Array([ 1, 0, 1 ]),
		hash: 'SHA-256',
	}
	
	/** Asymmetric cipher pair with shortest payload */
	export async function $mol_crypto_cipher_pair( this: $ ) {
		
		const pair = await $mol_crypto_native.subtle.generateKey(
			algorithm,
			true,
			[ 'encrypt', 'decrypt' ]
		)
		
		return {
			
			public: new $mol_crypto_cipher_public(
				pair.publicKey as CryptoKey & { type: 'public' }
			),
			
			private: new $mol_crypto_cipher_private(
				pair.privateKey as CryptoKey & { type: 'private' }
			),
			
		}
		
	}

	/** Asymmetric cipher public key wrapper with shortest payload */
	export class $mol_crypto_cipher_public extends Object {
		
		/** Public key size in bytes. */
		static size = 162
		
		constructor(
			readonly native: CryptoKey & { type: 'public' }
		) {
			super()
		}
		
		static async from( serial: BufferSource ) {
			return new this(
				await $mol_crypto_native.subtle.importKey(
					'spki',
					serial,
					algorithm,
					true,
					[ 'encrypt' ],
				) as CryptoKey & { type: 'public' }
			)
		}
		
		/** 162 bytes */
		async serial() {
			return await $mol_crypto_native.subtle.exportKey(
				'spki',
				this.native,
			)
		}
		
		/** max 86 bytes input, 128 bytes output */
		async encrypt( data: BufferSource ): Promise< ArrayBuffer > {
			return await $mol_crypto_native.subtle.encrypt(
				algorithm,
				this.native,
				data,
			)
		}
		
	}

	/** Asymmetric cipher private key wrapper with shortest payload */
	export class $mol_crypto_cipher_private extends Object {
		
		constructor(
			readonly native: CryptoKey & { type: 'private' }
		) {
			super()
		}
		
		static async from( serial: BufferSource ) {
			return new this(
				await $mol_crypto_native.subtle.importKey(
					'pkcs8',
					serial,
					algorithm,
					true,
					[ 'decrypt' ],
				) as CryptoKey & { type: 'private' }
			)
		}
		
		/** ~640 bytes */
		async serial() {
			return await $mol_crypto_native.subtle.exportKey(
				'pkcs8',
				this.native,
			)
		}
		
		async decrypt( data: BufferSource ): Promise< ArrayBuffer > {
			return await $mol_crypto_native.subtle.decrypt(
				algorithm,
				this.native,
				data,
			)
		}
		
	}
	
	/** Encrypted size in bytes. */
	export const $mol_crypto_cipher_ecrypted_size = 128

}
