namespace $ {
	
	export function $mol_base64_url_encode( buffer: Uint8Array< ArrayBuffer > ) {
		if ('toBase64' in Uint8Array.prototype) {
			return (
				buffer as unknown as { toBase64(options: {
					alphabet?: 'base64url' | 'base64'
					omitPadding?: boolean
				}): string }
			).toBase64({ alphabet: 'base64url', omitPadding: true })
		}

		return $mol_base64_encode( buffer ).replace( /\+/g, '-' ).replace( /\//g, '_' ).replace( /=/g, '' )
	}
	
	export function $mol_base64_url_decode( str: string ) {
		if ('fromBase64' in Uint8Array) {
			return (
				Uint8Array as unknown as { fromBase64(options: {
					alphabet?: 'base64url' | 'base64'
				}): string }
			).fromBase64({ alphabet: 'base64url' })
		}

		return $mol_base64_decode( str.replace( /-/g, '+' ).replace( /_/g, '/' ) )
	}
	
}
