namespace $ {
	const base_decode = $.$mol_base64_decode

	export function $mol_base64_decode_web(base64Str: string, options?: { alphabet?: 'base64url' }): Uint8Array< ArrayBuffer > {

		if ('fromBase64' in Uint8Array) return base_decode(base64Str, options)
		base64Str = base64Str.replace( /-/g, '+' ).replace( /_/g, '/' )
		
		const buf = Uint8Array.from($mol_dom_context.atob(base64Str), c => c.charCodeAt(0))

		return buf
	}

	$.$mol_base64_decode = $mol_base64_decode_web
}
