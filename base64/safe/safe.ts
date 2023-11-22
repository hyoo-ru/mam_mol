namespace $ {
	
	export function $mol_base64_encode_safe( buffer: Uint8Array ) {
		return $mol_base64_encode( buffer ).replace( /\+/g, '-' ).replace( /\//g, '_' ).replace( /=/g, '' )
	}
	
	export function $mol_base64_safe_decode( str: string ) {
		return $mol_base64_decode( str.replace( /-/g, '+' ).replace( /_/g, '/' ) )
	}
	
}
