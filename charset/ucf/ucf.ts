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
	
	/** Encode text to Unicode Compact Format. */
	export function $mol_charset_ucf_encode( str: string ) {
		const buf = $mol_charset_buffer( str.length * 3 )
		return buf.slice( 0, $mol_charset_ucf_encode_to( str, buf ) )
	}	
	
	export function $mol_charset_ucf_encode_to( str: string, buf: Uint8Array< ArrayBuffer >, from = 0 ) {

		let pos = from
		let mode = tiny_mode
		
		const write_high = ( code: number )=> {
			buf[ pos ++ ] = ( ( code + 128 - mode ) & 0x7F ) | 0x80
		}
		
		const write_remap = ( code: number )=> {
			const fast = ascii_map[ code ]
			if( fast ) write_high( fast )
			else buf[ pos ++ ] = code
		}
		
		const write_mode = ( m: number )=> {
			write_high( m )
			mode = m
		}
		
		for( let i = 0; i < str.length; i++ ) {
			
			let code = str.charCodeAt( i )
			if( code >= 0xD8_00 && code < 0xDC_00 ) code = ( ( code - 0xd800 ) << 10 ) + str.charCodeAt( ++ i ) + 0x2400
			
			if( code < 0x80 ) { // ASCII
				
				if( mode !== tiny_mode ) {
					const fast = ascii_map[ code ]
					if( !fast ) write_mode( tiny_mode )
				}
				buf[ pos ++ ] = code
				
			} else if( code < tiny_limit ) { // Tiny
				
				const page = ( code >> 7 ) + tiny_mode
				code &= 0x7F
				
				if( page === 164 ) { // diacritics
					const fast = diacr_map[ code ]
					if( fast ) {
						if( mode !== tiny_mode ) write_mode( tiny_mode )
						write_high( fast )
						continue
					}
				}
				
				if( mode !== page ) write_mode( page )
				write_remap( code )
				
			} else if( code < wide_limit ) { // Wide
				
				code -= wide_offset
				const page = ( code >> 14 ) + wide_mode
				if( mode !== page ) write_mode( page )
				write_remap( code & 0x7F )
				write_remap( ( code >> 7 ) & 0x7F )
				
			} else { // Full
				
				if( mode !== full_mode ) write_mode( full_mode )
				write_remap( code & 0x7F )
				write_remap( ( code >> 7 ) & 0x7F )
				write_remap( code >> 14 )
				
			}

		}
		
		if( mode !== tiny_mode ) write_mode( tiny_mode )

		return pos - from
	}
	
	/** Decode text from Unicode Compact Format. */
	export function $mol_charset_ucf_decode( buffer: Uint8Array< ArrayBuffer >, mode = tiny_mode ) {
		
		let text = ''
		let pos = 0
		let page_offset = 0
		
		const read_code = ()=> {
			let code = buffer[ pos ++ ]
			if( code > 0x80 ) code = ( ( mode + code ) & 0x7F ) | 0x80
			return code
		}
		
		const read_remap = ()=> {
			let code = read_code()
			if( code >= 0x80 ) code = ascii_set[ code - 0x80 ]
			return code
		}
		
		while( pos < buffer.length ) {
			
			let code = read_code()
			
			if( code < full_mode ) { // Char Code
				
				if( mode === tiny_mode ) {
					if( code > 0x80 ) {
						code = diacr_set[ code - 0x080 ] | ( 6 << 7 )
					}
				} else if( !ascii_map[ code ] ) {
					if( code >= 0x80 ) code = ascii_set[ code - 0x80 ]
					if( mode < tiny_mode ) code |= read_remap() << 7
					if( mode === full_mode ) code |= read_remap() << 14
					code += page_offset
				}
				
				text += String.fromCodePoint( code )
				
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
		
		if( mode !== tiny_mode ) {
			return $mol_fail( new Error( 'Wrong ending', { cause: { text } } ) )
		}
		
		return text
	}

}
