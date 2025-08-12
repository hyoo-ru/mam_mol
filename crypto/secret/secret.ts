namespace $ {
	
	const algorithm = {
		name: 'AES-CBC',
		length: 128,
		tagLength: 32,
	}
	
	/**
	 * Symmetric cipher with shortest payload.
	 * @deprecated Use $mol_crypto_sacred.
	 */
	export class $mol_crypto_secret extends Object {
		
		/** Key size in bytes. */
		static size = 16
		
		constructor(
			readonly native: CryptoKey & { type: 'secret' }
		) {
			super()
		}
		
		static async generate() {
			return new this(
				await $mol_crypto_native.subtle.generateKey(
					algorithm,
					true,
					[ 'encrypt', 'decrypt' ]
				) as CryptoKey & { type: 'secret' }
			)
		}
		
		static async from( serial: BufferSource ) {
			
			return new this(
				await $mol_crypto_native.subtle.importKey(
					'raw',
					serial,
					algorithm,
					true,
					[ 'encrypt', 'decrypt' ],
				) as CryptoKey & { type: 'secret' }
			)
			
		}
		
		static async pass( pass: string, salt: Uint8Array< ArrayBuffer > ) {
			
			return new this(
				await $mol_crypto_native.subtle.deriveKey(
					
					{
						name: "PBKDF2",
						salt,
						iterations: 10_000,
						hash: "SHA-256",
					},
					
					await $mol_crypto_native.subtle.importKey(
						"raw",
						$mol_charset_encode( pass ),
						"PBKDF2",
						false,
						[ "deriveKey" ],
					),
					
					algorithm,
					true,
					[ 'encrypt', 'decrypt' ],
					
				) as CryptoKey & { type: 'secret' }
			)
			
		}
		
		static async derive( private_serial: string, public_serial: string ) {
			
			const ecdh = { name: "ECDH", namedCurve: "P-256" }
			const jwk = { crv: 'P-256', ext: true, kty: 'EC' }
			
			const private_key = await $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					... jwk,
					key_ops: [ 'deriveKey' ],
					x: private_serial.slice( 0, 43 ),
					y: private_serial.slice( 43, 86 ),
					d: private_serial.slice( 86, 129 ),
				},
				ecdh,
				true,
				[ 'deriveKey' ],
			)
		
			const public_key = await $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					... jwk,
					key_ops: [],
					x: public_serial.slice( 0, 43 ),
					y: public_serial.slice( 43, 86 ),
				},
				ecdh,
				true,
				[],
			)
			
			const secret = await $mol_crypto_native.subtle.deriveKey(
				{
				  name: "ECDH",
				  public: public_key,
				},
				private_key,
				algorithm,
				true,
				[ "encrypt", "decrypt" ],
			)
		
			return new this( secret as CryptoKey & { type: 'secret' } )
		}
		
		/** 16 bytes */
		async serial() {
			return new Uint8Array( await $mol_crypto_native.subtle.exportKey(
				'raw',
				this.native,
			) )
		}

		/** 16n bytes */
		async encrypt( open: BufferSource, salt: BufferSource ) {
			return new Uint8Array( await $mol_crypto_native.subtle.encrypt(
				{
					... algorithm,
					iv: salt,
				},
				this.native,
				open
			) )
		}
		
		async decrypt( closed: BufferSource, salt : BufferSource ) {
			return new Uint8Array( await $mol_crypto_native.subtle.decrypt(
				{
					... algorithm,
					iv: salt,
				},
				this.native,
				closed
			) )
		}
		
	}

}
