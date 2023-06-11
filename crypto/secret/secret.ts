namespace $ {
	
	const algorithm = {
		name: 'AES-GCM',
		length: 128,
		tagLength: 32,
	}
	
	/** Symmetric cipher with shortest payload */
	export class $mol_crypto_secret extends Object {
		
		/** Key size in bytes. */
		static size = 16
		
		/** Extra size in bytes to encrypted data. */
		static extra = 4
		
		constructor(
			readonly native: CryptoKey & { type: 'private' }
		) {
			super()
		}
		
		static async generate() {
			return new this(
				await $mol_crypto_native.subtle.generateKey(
					algorithm,
					true,
					[ 'encrypt', 'decrypt' ]
				) as CryptoKey & { type: 'private' }
			)
		}
		
		static async from( serial: BufferSource | string ) {
			
			if( typeof serial === 'string' ) {
				serial = $mol_charset_encode( serial )
				serial = await $mol_crypto_native.subtle.digest( 'SHA-256', serial )
			}
			
			return new this(
				await $mol_crypto_native.subtle.importKey(
					'raw',
					serial,
					algorithm,
					true,
					[ 'encrypt', 'decrypt' ],
				) as CryptoKey & { type: 'private' }
			)
			
		}
		
		/** 16 bytes */
		async serial() {
			return await $mol_crypto_native.subtle.exportKey(
				'raw',
				this.native,
			)
		}

		/** 4 bytes + data length */
		async encrypt( open: BufferSource, salt: BufferSource ): Promise< ArrayBuffer > {
			return await $mol_crypto_native.subtle.encrypt(
				{
					... algorithm,
					iv: salt,
				},
				this.native,
				open
			)
		}
		
		async decrypt( closed: BufferSource, salt : BufferSource ): Promise< ArrayBuffer > {
			return await $mol_crypto_native.subtle.decrypt(
				{
					... algorithm,
					iv: salt,
				},
				this.native,
				closed
			)
		}
		
	}

}
