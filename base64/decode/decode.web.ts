namespace $ {
	const base_decode = $.$mol_base64_decode

	export function $mol_base64_decode_web(base64Str: string): Uint8Array< ArrayBuffer > {
		if ('fromBase64' in Uint8Array) return base_decode(base64Str)

		return Uint8Array.from($mol_dom_context.atob(base64Str), c => c.charCodeAt(0))
	}

	$.$mol_base64_decode = $mol_base64_decode_web
}
