namespace $ {
	
	let buf = new Uint8Array( 2**12 ) // 4KB Mem Page

	export function $mol_charset_ucf_encode( str: string ) {
		const buf = $mol_charset_buffer( str.length * 3 )
		return buf.slice( 0, $mol_charset_ucf_encode_to( str, buf ) )
	}

	function $mol_charset_ucf_encode_to( str: string, buf: Uint8Array< ArrayBuffer >, from = 0 ) {

		let pos = from
		let mode = 0xE

		for( let i = 0; i < str.length; i++ ) {
			
			let code = str.charCodeAt( i )
			if( code >= 0xd800 && code < 0xe000 ) code = ( ( code - 0xd800 ) << 10 ) + str.charCodeAt( ++ i ) + 0x2400
			
			if( code < 0x20 ) {
				
				if( code > 0x08 && code < 0x0E ) { // ASCII Printable
					buf[ pos ++ ] = code
				} else { // ASCII Invisible
					if( mode !== 0x0E ) buf[ pos ++ ] = mode = 0x0E
					buf[ pos ++ ] = code | 0x80
				}
				
			} else {
				
				if( code < 0xFF ) { // ASCII Latin
					buf[ pos ++ ] = code
				} else if( code < 0x09_00 ) { // Tiny
					const page = ( code >> 7 ) + 0x0E
					if( mode !== page ) buf[ pos ++ ] = mode = page
					buf[ pos ++ ] = ( code & 0x7F ) | 0x80
				} else if( code < 0x04_00_00 ) { // Wide
					const page = code >> 15
					if( mode !== page ) buf[ pos ++ ] = mode = page
					buf[ pos ++ ] = ( code & 0x7F ) | 0x80
					buf[ pos ++ ] = code >> 7
				} else { // Full
					if( mode !== 0x08 ) buf[ pos ++ ] = mode = 0x08
					buf[ pos ++ ] = ( code & 0x7F ) | 0x80
					buf[ pos ++ ] = code >> 7
					buf[ pos ++ ] = code >> 15
				}
				
			}

		}

		return pos - from
	}
	
}
