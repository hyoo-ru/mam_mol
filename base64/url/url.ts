namespace $ {
	
	export function $mol_base64_url_encode( buffer: Uint8Array< ArrayBuffer > ) {
		return $mol_base64_encode( buffer, { alphabet: 'base64url', omitPadding: true } )
	}
	
	export function $mol_base64_url_decode( str: string ) {
		return $mol_base64_decode( str.replace( /-/g, '+' ).replace( /_/g, '/' ) )
	}
	
}
