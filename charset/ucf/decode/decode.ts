namespace $ {

	const fast_char = `0123456789.,:;()?!-'" \n`
	
	/** Decode text from Unicode Compact Format. */
	export function $mol_charset_ucf_decode( buffer: Uint8Array< ArrayBuffer >, mode = 0x9C ) {
		
		let text = ''
		let pos = 0
		let page_offset = 0
		
		while( pos < buffer.length ) {
			
			let code = buffer[ pos ++ ]
			
			if( code < 0x80 ) { // Char Code
				
				if( mode < 0x9C ) code |= buffer[ pos ++ ] << 7
				if( mode === 0x97 ) code |= buffer[ pos ++ ] << 15
				text += String.fromCodePoint( page_offset + code )
				
			} else if( code < 0x97 ) { // ASCII
				
				text += fast_char[ code - 0x80 ]
				
			} else if( code >= 0x9C ) { // Tiny Set
				
				mode = code
				page_offset = ( mode - 0x9C ) << 7
				
			} else if( code === 0x97 ) { // Full Set
				
				mode = code
				page_offset = 0
				
			} else { // Wide Set
				
				mode = code
				page_offset = ( ( mode - 0x98 ) << 15 ) + 0x20_00
				
			}
			
		}
		
		return text
	}

}
