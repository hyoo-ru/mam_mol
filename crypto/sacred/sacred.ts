namespace $ {
	
	/** Symmetric cipher with shortest payload. */
	export class $mol_crypto_sacred extends $mol_buffer {
		
		/** Key size in bytes. */
		static size = 16 as const
		
		/** Makes new random secret. */
		static make() {
			return this.from( $mol_crypto_salt() )
		}
		
		/** Makes from string of buffer view. */
		static from< This extends typeof $mol_buffer >(
			this: This,
			serial: string | ArrayBufferView< ArrayBuffer >,
		) {
			
			if( typeof serial === 'string' ) {
				serial = new Uint8Array([
					... $mol_base64_url_decode( serial ),
				]) as Uint8Array< ArrayBuffer >
			}
			
			if(!( serial instanceof Uint8Array )) {
				serial = new Uint8Array( serial.buffer, serial.byteOffset, serial.byteLength )
			}
			
			;( serial as Uint8Array )[0] = 0
			
			const sacred = super.from( serial ) as InstanceType< This >
		
			return sacred
		}
		
		static async from_native( native: CryptoKey ) {
			
			const buf = await $mol_crypto_native.subtle.exportKey( 'raw', native ).catch( $mol_crypto_restack )
			
			const sacred = this.from( new Uint8Array( buf ) )
			sacred._native = native as CryptoKey & { type: 'secret' }
			
			return sacred
		}
		
		constructor( buffer: ArrayBuffer, byteOffset?: number, byteLength?: number ) {
			super( buffer, byteOffset, byteLength )
			if( this.getUint8( 0 ) !== 0 ) $mol_fail( new Error( 'Buffer should starts with 0 byte' ) )
		}
		
		@ $mol_memo.method
		toString() {
			return $mol_base64_url_encode( this.asArray() )
		}
		
		_native: undefined | CryptoKey & { type: 'secret' }
		/** Native crypto secret */
		async native() {
			return this._native ?? ( this._native = await $mol_crypto_native.subtle.importKey(
				'raw',
				this,
				{
					name: 'AES-CBC',
					length: 128,
				},
				true,
				[ 'encrypt', 'decrypt' ],
			).catch( $mol_crypto_restack ) as CryptoKey & { type: 'secret' } )
		}
		
		/** Encrypt any binary message. 16n bytes */
		async encrypt( open: BufferSource, salt: BufferSource ) {
			return new Uint8Array( await $mol_crypto_native.subtle.encrypt(
				{
					name: 'AES-CBC',
					length: 128,
					tagLength: 32,
					iv: salt,
				},
				await this.native(),
				open
			).catch( $mol_crypto_restack ) )
		}
		
		/** Decrypt any binary message. */
		async decrypt( closed: BufferSource, salt : BufferSource ) {
			return new Uint8Array( await $mol_crypto_native.subtle.decrypt(
				{
					name: 'AES-CBC',
					length: 128,
					tagLength: 32,
					iv: salt,
				},
				await this.native(),
				closed
			).catch( $mol_crypto_restack ) )
		}
		
		/** Encrypts this Sacred by another. 16 bytes */
		async close( sacred: $mol_crypto_sacred, salt: BufferSource ) {
			const buf = new Uint8Array( sacred.buffer, sacred.byteOffset + 1, sacred.byteLength - 1 )
			return this.encrypt( buf, salt )
		}
		
		/** Encrypts this Sacred by another. 16 bytes */
		async open( buf: Uint8Array, salt: BufferSource ) {
			const buf2 = new Uint8Array( 16 )
			buf2.set( await this.decrypt( buf, salt ), 1 )
			return new $mol_crypto_sacred( buf2.buffer )
		}
		
	}

}
