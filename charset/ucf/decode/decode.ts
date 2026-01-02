namespace $ {

	/** Decode text from Unicode Compact Format. */
	export function $mol_charset_ucf_decode( buffer: Uint8Array< ArrayBuffer >, mode = 0xE ) {
		
		let text = ''
		let pos = 0
		let page_offset = 0
		
		while( pos < buffer.length ) {
			
			let code = buffer[ pos ++ ]
			
			if( code < 0x20 ) {
				
				if( code >= 0x0E ) {
					mode = code
					page_offset = ( mode - 0x0E ) << 7
				} else if( code > 0x08 ) {
					text += String.fromCodePoint( code )
				} else if( code === 0x08 ) {
					mode = 0x08
					page_offset = 0
				} else {
					mode = code
					page_offset = mode << 15
				}
				
			} else if( code < 0x80 ) {
				
				text += String.fromCodePoint( code )
				
			} else {
				
				code &= 0x7F
				if( mode <= 0x08 ) code |= buffer[ pos ++ ] << 7
				if( mode === 0x08 ) code |= buffer[ pos ++ ] << 15
				text += String.fromCodePoint( page_offset + code )
				
			}
			
		}
		
		return text
	}

}
