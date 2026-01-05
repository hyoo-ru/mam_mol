namespace $ {
	
	/** Encode text to Unicode Compact Format. */
	export function $mol_charset_ucf_encode( str: string ) {
		const buf = $mol_charset_buffer( str.length * 3 )
		return buf.slice( 0, $mol_charset_ucf_encode_to( str, buf ) )
	}
	
	const fast_char = `0123456789.,:;()?!-'" \n`
	const fast_map = new Array( 0x80 ).fill( 0 )
	for( let i = 0; i < fast_char.length; ++i ) fast_map[ fast_char[ i ].charCodeAt(0) ] = i | 0x80

	export function $mol_charset_ucf_encode_to( str: string, buf: Uint8Array< ArrayBuffer >, from = 0 ) {

		let pos = from
		let mode = 0x9C

		for( let i = 0; i < str.length; i++ ) {
			
			let code = str.charCodeAt( i )
			if( code >= 0xd800 && code < 0xe000 ) code = ( ( code - 0xd800 ) << 10 ) + str.charCodeAt( ++ i ) + 0x2400
			
			if( code < 0x80 ) { // ASCII
				
				if( mode !== 0x9C ) {
					const fast = fast_map[ code ]
					if( fast ) code = fast
					else buf[ pos ++ ] = mode = 0x9C
				}
				buf[ pos ++ ] = code
				
			} else if( code < 0x32_00 ) { // Tiny
				
				const page = ( code >> 7 ) + 0x9C
				if( mode !== page ) buf[ pos ++ ] = mode = page
				buf[ pos ++ ] = code & 0x7F
				
			} else if( code < 0x04_20_00 ) { // Wide
				
				code -= 0x2000
				const page = ( code >> 15 ) + 0x98
				if( mode !== page ) buf[ pos ++ ] = mode = page
				buf[ pos ++ ] = code & 0x7F
				buf[ pos ++ ] = code >> 7
				
			} else { // Full
				
				if( mode !== 0x97 ) buf[ pos ++ ] = mode = 0x97
				buf[ pos ++ ] = code & 0x7F
				buf[ pos ++ ] = code >> 7
				buf[ pos ++ ] = code >> 15
				
			}

		}

		return pos - from
	}
	
}
