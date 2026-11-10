namespace $ {

	type BufferSource = ArrayBufferView< ArrayBuffer > | ArrayBuffer

	/** Symmetric AES-CTR secret. */
	export class $mol_crypto2_secret extends $mol_buffer {

		static size = 16 as const

		/** Makes new random secret. */
		static make() {
			return this.from( $mol_crypto2_nonce() )
		}

		/** Makes from string or buffer view. */
		static from< This extends typeof $mol_buffer >(
			this: This,
			serial: string | ArrayBufferView< ArrayBuffer >,
		) {

			if( typeof serial === 'string' ) serial = $mol_base64_url_decode( serial )
			
			if( serial.byteLength !== $mol_crypto2_secret.size ) {
				return $mol_fail( new RangeError( 'Wrong key size', { cause: { size: serial.byteLength } } ) )
			}

			if(!( serial instanceof Uint8Array )) {
				serial = new Uint8Array( serial.buffer, serial.byteOffset, serial.byteLength )
			}

			return super.from( serial ) as InstanceType< This >
		}

		static async from_native( native: CryptoKey ) {

			const buffer = await $mol_crypto_native.subtle.exportKey( 'raw', native ).catch( $mol_crypto_restack )

			const secret = this.from( new Uint8Array( buffer ) )
			secret._native = native as CryptoKey & { type: 'secret' }

			return secret
		}

		@ $mol_memo.method
		toString() {
			return $mol_base64_url_encode( this.asArray() )
		}

		_native: undefined | CryptoKey & { type: 'secret' }
		/** Native crypto secret. */
		async native() {
			return this._native ?? ( this._native = await $mol_crypto_native.subtle.importKey(
				'raw', // format
				this, // buffer source
				'AES-CTR', // algorithm
				true, // extractable
				[ 'encrypt', 'decrypt' ], // usages
			).catch( $mol_crypto_restack ) as CryptoKey & { type: 'secret' } )
		}

		/** Encrypts data without changing its length. */
		async encrypt( open: BufferSource, nonce: BufferSource ) {

			return new Uint8Array( await $mol_crypto_native.subtle.encrypt(
				{ name: 'AES-CTR', counter: nonce, length: 64 },
				await this.native(),
				open,
			).catch( $mol_crypto_restack ) )
		}

		/** Decrypts data without changing its length. */
		async decrypt( closed: BufferSource, nonce: BufferSource ) {

			return new Uint8Array( await $mol_crypto_native.subtle.decrypt(
				{ name: 'AES-CTR', counter: nonce, length: 64 },
				await this.native(),
				closed,
			).catch( $mol_crypto_restack ) )
		}

	}

}
