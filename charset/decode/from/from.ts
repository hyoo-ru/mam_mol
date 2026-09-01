namespace $ {

	/** Reads `count` chars from UTF8 `buffer` starting `from` offset. */
	export function $mol_charset_decode_from( buffer: Uint8Array, from: number, count: number ) {
		
		const codes: number[] = []
		let pos = from
		
		while( pos < buffer.length && codes.length < count ) {
			
			const byte1 = buffer[ pos ++ ]
			
			if( byte1 <= 0x7F ) {
				
				codes.push( byte1 )
				
			} else if( ( byte1 & 0xE0 ) === 0xC0 ) {
				
				if( pos >= buffer.length ) break
				
				const byte2 = buffer[ pos ++ ]
				const code = ( ( byte1 & 0x1F ) << 6 ) | ( byte2 & 0x3F )
				
				codes.push( code )
				
			} else if( ( byte1 & 0xF0 ) === 0xE0 ) {
				
				if( pos + 1 >= buffer.length ) break
				
				const byte2 = buffer[ pos ++ ]
				const byte3 = buffer[ pos ++ ]
				const code = ( ( byte1 & 0x0F ) << 12 ) | ( ( byte2 & 0x3F ) << 6 ) | ( byte3 & 0x3F )
				
				codes.push( code )
				
			} else if( ( byte1 & 0xF8 ) === 0xF0 ) {
				
				if( pos + 2 >= buffer.length ) break
				
				const byte2 = buffer[ pos ++ ]
				const byte3 = buffer[ pos ++ ]
				const byte4 = buffer[ pos ++ ]
				let code = ( ( byte1 & 0x07 ) << 18 ) | ( ( byte2 & 0x3F ) << 12 ) | ( ( byte3 & 0x3F ) << 6 ) | ( byte4 & 0x3F )
				
				if( code > 0xFFFF ) { // Surrogate pair
					
					code -= 0x10000
					const hi = 0xD800 + ( code >> 10 )
					const lo = 0xDC00 + ( code & 0x3FF )
					
					codes.push( hi, lo )
					
				} else {
					codes.push( code )
				}
				
			} else {
				codes.push( 0xFFFD ) // �
			}
			
		}
		
		return [ String.fromCharCode( ... codes ), pos - from ] as const
	}

}
