namespace $ {
	
	export function $mol_bigint_decode( buf: Uint8Array< ArrayBuffer > ) {
		
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
