namespace $ {
	export function $mol_base64_decode_web(base64Str: string): Uint8Array< ArrayBuffer > {

		if ('fromBase64' in Uint8Array) return (Uint8Array as {
			fromBase64(str: string): Uint8Array<ArrayBuffer>
		}).fromBase64(base64Str)

		const buf = Uint8Array.from($mol_dom_context.atob(base64Str), c => c.charCodeAt(0))

		return buf
	}

	$.$mol_base64_decode = $mol_base64_decode_web
}
