namespace $ {

	/** Reads `count` chars from UTF8 `buffer` starting `from` offset. */
	export function $mol_charset_decode_from( buffer: Uint8Array, from: number, count: number ) {
		
		let res = ''
		let pos = from
		
		while( pos < buffer.length && res.length < count ) {
			
			const byte1 = buffer[ pos ++ ]
			
			if( byte1 <= 0x7F ) {
				
				res += String.fromCharCode( byte1 )
				
			} else if( ( byte1 & 0xE0 ) === 0xC0 ) {
				
				if( pos >= buffer.length ) break
				
				const byte2 = buffer[ pos ++ ]
				let code = ( ( byte1 & 0x1F ) << 6 ) | ( byte2 & 0x3F )
				
				res += String.fromCharCode( code )
				
			} else if( ( byte1 & 0xF0 ) === 0xE0 ) {
				
				if( pos + 1 >= buffer.length ) break
				
				const byte2 = buffer[ pos ++ ]
				const byte3 = buffer[ pos ++ ]
				let code = ( ( byte1 & 0x0F ) << 12 ) | ( ( byte2 & 0x3F ) << 6 ) | ( byte3 & 0x3F )
				
				res += String.fromCharCode( code )
				
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
					
					res += String.fromCharCode( hi, lo )
					
				} else {
					
					res += String.fromCharCode( code )
				}
				
				
			} else {
				res += '�'
			}
			
		}
		
		return [ res, pos - from ] as const
	}

}
