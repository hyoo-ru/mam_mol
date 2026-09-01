namespace $ {
	
	let buf = new Uint8Array( 2**12 ) // 4KB Mem Page
	
	/** Temporary buffer. Recursive usage isn't supported. */
	export function $mol_charset_buffer( size: number ) {
		if( buf.byteLength < size ) buf = new Uint8Array( size )
		return buf
	}
	
}
