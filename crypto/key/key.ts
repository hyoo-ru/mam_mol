namespace $ {
	
	const ecdsa = {
		name: 'ECDSA',
		hash: 'SHA-1',
		namedCurve: "P-256",
	}
	
	const ecdh = { name: "ECDH", namedCurve: "P-256" }
	const jwk = { crv: 'P-256', ext: true, kty: 'EC' }
	
	export class $mol_crypto_key extends $mol_buffer {
		
		static from< This extends typeof $mol_crypto_key >(
			this: This,
			serial: number | string | ArrayBufferView< ArrayBuffer >,
		) {
			
			if( typeof serial === 'string' ) {
				serial = new Uint8Array([
					... $mol_base64_url_decode( serial.slice( 0, 43 ) ),
					... $mol_base64_url_decode( serial.slice( 43, 86 ) ),
					... $mol_base64_url_decode( serial.slice( 86, 129 ) ),
				]) as Uint8Array< ArrayBuffer >
			}
			
			return super.from( serial ) as InstanceType< This >
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
				ecdsa,
				Boolean( 'extractable' ),
				[ 'verify' ],
			).catch( $mol_crypto_restack )
		}
		
		@ $mol_memo.method
		async native_derive() {
			
			const serial = this.toString()
			
			return await $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					... jwk,
					key_ops: [],
					x: serial.slice( 0, 43 ),
					y: serial.slice( 43, 86 ),
				},
				ecdh,
				true,
				[],
			).catch( $mol_crypto_restack )
			
		}
		
		async verify( data: BufferSource, sign: BufferSource ) {
			return await $mol_crypto_native.subtle.verify(
				ecdsa,
				await this.native(),
				sign,
				data,
			).catch( $mol_crypto_restack )
		}
		
	}
	
	export class $mol_crypto_key_private extends $mol_crypto_key {
		
		static size_str = 129
		static size_bin = 96
		static size_sign = 64
		
		static async generate() {
			
			const pair = await $mol_crypto_native.subtle.generateKey(
				ecdsa,
				Boolean( 'extractable' ),
				[ 'sign', 'verify' ]
			).catch( $mol_crypto_restack )
			
			const { x, y, d } = await $mol_crypto_native.subtle.exportKey( 'jwk', pair.privateKey ).catch( $mol_crypto_restack )
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
				ecdsa,
				Boolean( 'extractable' ),
				[ 'sign' ],
			).catch( $mol_crypto_restack )
		}
		
		@ $mol_memo.method
		async native_derive() {
			
			const serial = this.toString()
			
			return $mol_crypto_native.subtle.importKey(
				'jwk',
				{
					... jwk,
					key_ops: [ 'deriveKey', 'deriveBits' ],
					x: serial.slice( 0, 43 ),
					y: serial.slice( 43, 86 ),
					d: serial.slice( 86, 129 ),
				},
				ecdh,
				Boolean( 'extractable' ),
				[ 'deriveKey', 'deriveBits' ],
			).catch( $mol_crypto_restack )
			
		}
		
		@ $mol_memo.method
		public() {
			return new $mol_crypto_key_public( this.asArray().slice( 0, 64 ).buffer )
		}
		
		async sign( data: BufferSource ) {
			return new Uint8Array( await $mol_crypto_native.subtle.sign(
				ecdsa,
				await this.native(),
				data
			).catch( $mol_crypto_restack ) )
		}
		
	}
	
}
