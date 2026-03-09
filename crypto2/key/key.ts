namespace $ {
	export class $mol_crypto2_key extends $mol_buffer {
		
		static size_str = 43
		static size_bin = 32
		
		static from< This extends typeof $mol_crypto_key2 >(
			this: This,
			serial: number | string | ArrayBufferView< ArrayBuffer >,
		) {
			
			if( typeof serial === 'string' ) {
				serial = new Uint8Array(
					serial.match( /.{43}/g )!
						.flatMap( chunk => [ ... $mol_base64_url_decode( chunk ) ] )
				)
			}
			
			return super.from( serial ) as InstanceType< This >
		}
		
		asArray() {
			return new Uint8Array( this.buffer, this.byteOffset, ( this.constructor as typeof $mol_crypto2_key ).size_bin )
		}
		
		@ $mol_memo.method
		toString() {
			return $mol_base64_url_encode( this.asArray() )
		}
		
	}
}
