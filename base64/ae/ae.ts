namespace $ {
	
	export function $mol_base64_ae_encode( buffer: Uint8Array< ArrayBuffer > ) {
		return $mol_base64_encode( buffer ).replace( /\+/g, 'æ' ).replace( /\//g, 'Æ' ).replace(/=/g,'')
	}
	
	export function $mol_base64_ae_decode( str: string ) {
		return $mol_base64_decode( str.replace( /æ/g, '+' ).replace( /Æ/g, '/' ) )
	}
	
}
