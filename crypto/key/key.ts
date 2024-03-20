namespace $ {
	
	const algorithm = {
		name: 'ECDSA',
		hash: 'SHA-256',
		namedCurve: "P-256",
	}
	
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
		
		@ $mol_memo.method
		async native() {
			const str = this.toString()
			return $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					crv: "P-256",
					ext: true,
					key_ops: [ 'verify' ],
					kty: "EC",
					x: str.slice( 0, 43 ),
					y: str.slice( 43, 86 ),
				},
				algorithm,
				true,
				[ 'verify' ],
			)
		}
		
		async verify( data: BufferSource, sign: BufferSource ) {
			return await $mol_crypto_native.subtle.verify(
				algorithm,
				await this.native(),
				sign,
				data,
			)
		}
		
	}
	
	export class $mol_crypto_key_private extends $mol_crypto_key {
		
		static size_str = 129
		static size_bin = 96
		static size_sign = 64
		
		static async generate() {
			
			const pair = await $mol_crypto_native.subtle.generateKey(
				algorithm,
				true,
				[ 'sign', 'verify' ]
			)
			
			const { x, y, d } = await $mol_crypto_native.subtle.exportKey( 'jwk', pair.privateKey )
			return this.from( x + y! + d! )
			
		}
		
		@ $mol_memo.method
		async native() {
			const str = this.toString()
			return await $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					crv: "P-256",
					ext: true,
					key_ops: [ 'sign' ],
					kty: "EC",
					x: str.slice( 0, 43 ),
					y: str.slice( 43, 86 ),
					d: str.slice( 86, 129 ),
				},
				algorithm,
				true,
				[ 'sign' ],
			)
		}
		
		@ $mol_memo.method
		public() {
			return new $mol_crypto_key_public( this.buffer, this.byteOffset, this.byteOffset + 64 )
		}
		
		async sign( data: BufferSource ) {
			return new Uint8Array( await $mol_crypto_native.subtle.sign(
				algorithm,
				await this.native(),
				data
			) )
		}
		
	}
	
}
