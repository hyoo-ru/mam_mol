namespace $ {

	const ascii_set =  [ ... `0123456789.,:;()'"- \n`  ].map( c => c.charCodeAt(0) )
	const ascii_map = new Array< number >( 0x80 ).fill( 0 )
	for( let i = 0; i < ascii_set.length; ++i ) ascii_map[ ascii_set[ i ] ] = i | 0x80

	const diacr_set = [
		0x00, 0x01, 0x0F, 0x0B, 0x07, 0x08, 0x12, 0x13, // up
		0x02, 0x0C, 0x06, 0x11, 0x03, 0x09, 0x0A, 0x04, // up
		0x28, 0x31, 0x27, 0x26, 0x23, // down
	]
	const diacr_map = new Array< number >( 0x80 ).fill( 0 )
	for( let i = 0; i < diacr_set.length; ++i ) diacr_map[ diacr_set[ i ] ] = i | 0x80

	const wide_offset = 0x0E_00
	const wide_limit = 128 * 128 * 8 + wide_offset
	const tiny_limit = 128 * 98

	const full_mode = 0x95
	const wide_mode = 0x96
	const tiny_mode = 0x9E

	const high = ( code: number, mode: number ) => ( ( code + 128 - mode ) & 0x7F ) | 0x80

	/** Encode text to Unicode Compact Format. */
	export function $mol_charset_ucf_encode( str: string ) {
		const buf = $mol_charset_buffer( str.length * 3 )
		return buf.slice( 0, $mol_charset_ucf_encode_to( str, buf ) )
	}

	export function $mol_charset_ucf_encode_to( str: string, buf: Uint8Array< ArrayBuffer >, from = 0 ) {

		let pos = from
		let mode = tiny_mode

		for( let i = 0; i < str.length; ++i ) {

			let code = str.charCodeAt( i )
			if( code >= 0xd800 && code < 0xe000 ) code = ( ( code - 0xd800 ) << 10 ) + str.charCodeAt( ++ i ) + 0x2400

			if( code < 0x80 ) { // ASCII

				if( mode !== tiny_mode && !ascii_map[ code ] ) {
					buf[ pos ++ ] = high( tiny_mode, mode )
					mode = tiny_mode
				}
				buf[ pos ++ ] = code

			} else if( code < tiny_limit ) { // Tiny

				const page = ( code >> 7 ) + tiny_mode
				code &= 0x7F

				if( page === 164 ) { // diacritics
					const fast = diacr_map[ code ]
					if( fast ) {
						if( mode !== tiny_mode ) {
							buf[ pos ++ ] = high( tiny_mode, mode )
							mode = tiny_mode
						}
						buf[ pos ++ ] = high( fast, mode )
						continue
					}
				}

				if( mode !== page ) {
					buf[ pos ++ ] = high( page, mode )
					mode = page
				}
				const fast = ascii_map[ code ]
				buf[ pos ++ ] = fast ? high( fast, mode ) : code

			} else if( code < wide_limit ) { // Wide

				code -= wide_offset
				const page = ( code >> 14 ) + wide_mode
				if( mode !== page ) {
					buf[ pos ++ ] = high( page, mode )
					mode = page
				}
				let byte = code & 0x7F
				let fast = ascii_map[ byte ]
				buf[ pos ++ ] = fast ? high( fast, mode ) : byte
				byte = ( code >> 7 ) & 0x7F
				fast = ascii_map[ byte ]
				buf[ pos ++ ] = fast ? high( fast, mode ) : byte

			} else { // Full

				if( mode !== full_mode ) {
					buf[ pos ++ ] = high( full_mode, mode )
					mode = full_mode
				}
				let byte = code & 0x7F
				let fast = ascii_map[ byte ]
				buf[ pos ++ ] = fast ? high( fast, mode ) : byte
				byte = ( code >> 7 ) & 0x7F
				fast = ascii_map[ byte ]
				buf[ pos ++ ] = fast ? high( fast, mode ) : byte
				byte = code >> 14
				fast = ascii_map[ byte ]
				buf[ pos ++ ] = fast ? high( fast, mode ) : byte

			}

		}

		if( mode !== tiny_mode ) buf[ pos ++ ] = high( tiny_mode, mode )

		return pos - from
	}

	/** Decode text from Unicode Compact Format. */
	export function $mol_charset_ucf_decode( buffer: Uint8Array< ArrayBuffer >, mode = tiny_mode ) {

		const result: string[] = []
		let pos = 0
		let page_offset = 0

		while( pos < buffer.length ) {

			let byte = buffer[ pos ++ ]
			let code = byte > 0x80 ? ( ( mode + byte ) & 0x7F ) | 0x80 : byte

			if( code < full_mode ) { // Char Code

				if( mode === tiny_mode ) {
					if( code > 0x80 ) code = diacr_set[ code - 0x080 ] | ( 6 << 7 )
				} else if( !ascii_map[ code ] ) {
					if( code >= 0x80 ) code = ascii_set[ code - 0x80 ]
					if( mode < tiny_mode ) {
						byte = buffer[ pos ++ ]
						code |= ( byte > 0x80 ? ( ( mode + byte ) & 0x7F ) | 0x80 : byte ) << 7
					}
					if( mode === full_mode ) {
						byte = buffer[ pos ++ ]
						code |= ( byte > 0x80 ? ( ( mode + byte ) & 0x7F ) | 0x80 : byte ) << 14
					}
					code += page_offset
				}

				result.push( String.fromCodePoint( code ) )

			} else if( code >= tiny_mode ) { // Tiny Set

				mode = code
				page_offset = ( mode - tiny_mode ) << 7

			} else if( code === full_mode ) { // Full Set

				mode = code
				page_offset = 0

			} else { // Wide Set

				mode = code
				page_offset = ( ( mode - wide_mode ) << 14 ) + wide_offset

			}

		}

		return result.join( '' )
	}

}
