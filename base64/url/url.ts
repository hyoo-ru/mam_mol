namespace $ {
	
	export function $mol_base64_url_encode( buffer: Uint8Array< ArrayBuffer > ) {
		return (
			buffer as unknown as { toBase64(options: {
				alphabet?: 'base64url' | 'base64'
				omitPadding?: boolean
			}): string }
		).toBase64({ alphabet: 'base64url', omitPadding: true })
	}
	
	export function $mol_base64_url_decode( str: string ) {
		return (
			Uint8Array as unknown as { fromBase64(str: string, options: {
				alphabet?: 'base64url' | 'base64'
			}): Uint8Array<ArrayBuffer> }
		).fromBase64(str, { alphabet: 'base64url' })
	}
	
}
