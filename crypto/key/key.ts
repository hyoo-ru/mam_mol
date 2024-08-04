namespace $ {

	//@ts-ignore
	const curves = nobleCurves

	export class $mol_crypto_key extends $mol_buffer {
		
		static from< This extends typeof $mol_crypto_key >( this: This, serial: number | string | ArrayBufferView ) {
			
			if( typeof serial === 'string' ) {
				serial = new Uint8Array([
					... $mol_base64_url_decode( serial.slice( 0, 43 ) ),
					... $mol_base64_url_decode( serial.slice( 43, 86 ) ),
					... $mol_base64_url_decode( serial.slice( 86, 129 ) ),
				])
			}
			
			return super.from( serial ) as InstanceType< This >
		}
		
		asArray() {
			return new Uint8Array( this.buffer, this.byteOffset, this.byteLength )
		}
		
		@ $mol_memo.method
		toString() {
			const arr = this.asArray()
			return $mol_base64_url_encode( arr.subarray( 0, 32 ) )
				+ $mol_base64_url_encode( arr.subarray( 32, 64 ) )
				+ $mol_base64_url_encode( arr.subarray( 64 ) )
		}
		
	}
	
	export class $mol_crypto_key_public extends $mol_crypto_key {
		
		static size_str = 86
		static size_bin = 64
		
		async verify( data: BufferSource, sign: BufferSource ) {

			const pub = this.asArray().subarray( 0, 32 )
			return curves.ed25519.verify( sign, data, pub )

		}
		
	}
	
	export class $mol_crypto_key_private extends $mol_crypto_key {
		
		static size_str = 129
		static size_bin = 96
		static size_sign = 64
		

		static async generate() {
			
			const priv = curves.ed25519.utils.randomPrivateKey()
			const pub = curves.ed25519.getPublicKey(priv)

			const serial = new Uint8Array([
				... pub,
				... pub,
				... priv,
			])

			return this.from( serial )

		}

		@ $mol_memo.method
		public() {
			return new $mol_crypto_key_public( this.buffer, this.byteOffset, this.byteOffset + 64 )
		}
		
		async sign( data: BufferSource ) {

			const priv = this.asArray().subarray( 64 )
			return curves.ed25519.sign( data, priv )

		}
		
	}
	
}
