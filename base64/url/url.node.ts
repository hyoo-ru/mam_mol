namespace $ {
	
	export function $mol_base64_url_encode_node( buffer: Uint8Array< ArrayBuffer > ) {
		return $mol_base64_encode( buffer ).replace( /\+/g, '-' ).replace( /\//g, '_' ).replace( /=/g, '' )
	}

	if ( ! ( 'toBase64' in Uint8Array.prototype ) ) {
		$.$mol_base64_url_encode = $mol_base64_url_encode_node
	}

	export function $mol_base64_url_decode_node( str: string ) {
		return $mol_base64_decode( str.replace( /-/g, '+' ).replace( /_/g, '/' ) )
	}

	if ( ! ( 'fromBase64' in Uint8Array ) ) {
		$.$mol_base64_url_decode = $mol_base64_url_decode_node
	}
	
}
