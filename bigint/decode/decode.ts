namespace $ {
	
	export function $mol_bigint_decode( buf: Uint8Array< ArrayBuffer > ) {
		
		if( buf.length === 8 ) return new BigInt64Array( buf.buffer, buf.byteOffset, 1 )[0]
		if( buf.length === 4 ) return BigInt( new Int32Array( buf.buffer, buf.byteOffset, 1 )[0] )
		if( buf.length === 2 ) return BigInt( new Int16Array( buf.buffer, buf.byteOffset, 1 )[0] )
		if( buf.length === 1 ) return BigInt( new Int8Array( buf.buffer, buf.byteOffset, 1 )[0] )
		
		const minus = ( buf.at(-1)! & 128 ) ? 255 : 0
		
		let result = 0n
		let offset = 0n
		
		for( let i = 0; i < buf.length; i++, offset += 8n ) {
			result |= BigInt( buf[i] ^ minus ) << offset
		}
		
		if( minus ) result = ( result + 1n ) * -1n
	
		return result
	}
	
}
