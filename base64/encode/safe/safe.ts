namespace $ {
	export function $mol_base64_encode_safe( buffer: Uint8Array ) {
		return $mol_base64_encode( buffer ).replace( /\+/g, '-' ).replace( /\//g, '_' ).replace( /=/, '' )
	}
}
