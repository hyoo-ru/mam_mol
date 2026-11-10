namespace $ {
	
	/** Pads any buffer view to a multiple of 16 bytes. */
	export function $mol_crypto2_padding_add( this: $, data: ArrayBufferView< ArrayBuffer > ) {
		
		const source = data instanceof Uint8Array
			? data
			: new Uint8Array( data.buffer, data.byteOffset, data.byteLength )
		
		const count = 16 - source.byteLength % 16
		const padded = new Uint8Array( source.byteLength + count )
		
		padded.set( source )
		this.$mol_crypto_native.getRandomValues( padded.subarray( source.byteLength ) )
		padded[ padded.byteLength - 1 ] = ( padded[ padded.byteLength - 1 ] & 0xF0 ) | ( count & 0x0F )
		
		return padded
	}
	
	/** Returns a view without the padding bytes. */
	export function $mol_crypto2_padding_crop( this: $, data: ArrayBufferView< ArrayBuffer > ) {
		
		const source = data instanceof Uint8Array
			? data
			: new Uint8Array( data.buffer, data.byteOffset, data.byteLength )
		
		const marker = source[ source.byteLength - 1 ] & 0x0F
		const count = marker || 16
		
		return source.subarray( 0, source.byteLength - count )
	}
	
}
