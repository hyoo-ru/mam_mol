namespace $ {
	
	const algorithm = {
		name: 'AES-GCM',
		length: 128,
	}
	
	/** Symmetric cipher with shortest payload */
	export class $mol_crypto_secret extends Object {
		
		constructor(
			readonly native: CryptoKey & { type: 'private' }
		) {
			super()
		}
		
		static async generate() {
			return new this(
				await crypto.subtle.generateKey(
					algorithm,
					true,
					[ 'encrypt', 'decrypt' ]
				) as CryptoKey & { type: 'private' }
			)
		}
		
		static async from( serial: DataView | ArrayBuffer ) {
			return new this(
				await crypto.subtle.importKey(
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
			return await crypto.subtle.exportKey(
				'raw',
				this.native,
			)
		}

		/** 16 bytes + data length */
		async encrypt( open: DataView | ArrayBuffer, salt: Uint8Array ) {
			return await crypto.subtle.encrypt(
				{
					... algorithm,
					iv: salt,
				},
				this.native,
				open
			)
		}
		
		async decrypt( closed: DataView | ArrayBuffer, salt : Uint8Array ) {
			return await crypto.subtle.decrypt(
				{
					... algorithm,
					iv: salt,
				},
				await this.native,
				closed
			)
		}
		
	}

}
