namespace $ {

	export function $mol_charset_encode( str: string ) {
		const buf = $mol_charset_buffer( str.length * 3 )
		return buf.slice( 0, $mol_charset_encode_to( str, buf ) )
	}

	export function $mol_charset_encode_to( str: string, buf: Uint8Array< ArrayBuffer >, from = 0 ) {

		let pos = from

		for( let i = 0; i < str.length; i++ ) {
			
			let code = str.charCodeAt( i )
			
			if( code < 0x80 ) { // ASCII - 1 octet
				
				buf[ pos ++ ] = code
				
			} else if( code < 0x800 ) { // 2 octet
				
				buf[ pos ++ ] = 0xc0 | ( code >> 6 )
				buf[ pos ++ ] = 0x80 | ( code & 0x3f )
				
			} else if( code < 0xd800 || code >= 0xe000 ) { // 3 octet
				
				buf[ pos ++ ] = 0xe0 | ( code >> 12 )
				buf[ pos ++ ] = 0x80 | ( ( code >> 6 ) & 0x3f )
				buf[ pos ++ ] = 0x80 | ( code & 0x3f )
				
			} else { // surrogate pair
				
				const point = ( ( code - 0xd800 ) << 10 ) + str.charCodeAt( ++ i ) + 0x2400
				
				buf[ pos ++ ] = 0xf0 | ( point >> 18 )
				buf[ pos ++ ] = 0x80 | ( ( point >> 12 ) & 0x3f )
				buf[ pos ++ ] = 0x80 | ( ( point >> 6 ) & 0x3f )
				buf[ pos ++ ] = 0x80 | ( point & 0x3f )
				
			}
			
		}

		return pos - from
	}

	export function $mol_charset_encode_size( str: string ) {

		let size = 0

		for( let i = 0; i < str.length; i++ ) {
			
			let code = str.charCodeAt( i )
			
			if( code < 0x80 ) size += 1
			else if( code < 0x800 ) size += 2
			else if( code < 0xd800 || code >= 0xe000 ) size += 3
			else size += 4
			
		}

		return size
	}

}
