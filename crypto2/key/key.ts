namespace $ {
	/** Base class for crypto keys. */
	export class $mol_crypto2_key extends $mol_buffer {
		
		static size_str = 43
		static size_bin = 32
		
		/** Kakes key from different params. */
		static from< This extends typeof $mol_buffer >(
			this: This,
			serial: number | string | ArrayBufferView< ArrayBuffer > | ArrayBuffer,
		) {
			
			if( typeof serial === 'string' ) {
				serial = new Uint8Array(
					serial.match( /.{43}/g )
						?.flatMap( chunk => [ ... $mol_base64_url_decode( chunk ) ] )
					?? $mol_fail( new Error( 'Str key too short', { cause: {
						min: 43,
						real: serial.length,
					} } ) )
				)
			}
			
			return super.from( serial ) as InstanceType< This >
		}
		
		/** Array view of public part. */
		asArray() {
			
			const size = ( this.constructor as typeof $mol_crypto2_key ).size_bin
			if( this.byteLength < size ) {
				return $mol_fail( new Error( 'Bin key too short', { cause: {
					min: size,
					real: this.byteLength,
				} } ) )
			}
			
			return new Uint8Array( this.buffer, this.byteOffset, size )
		}
		
		/** String representation of public part. */
		@ $mol_memo.method
		toString() {
			return $mol_base64_url_encode( this.asArray() )
		}
		
	}
}
