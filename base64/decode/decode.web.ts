namespace $ {
	export function $mol_base64_decode_web(base64Str: string): Uint8Array< ArrayBuffer > {

		const buf = Uint8Array.from($mol_dom_context.atob(base64Str), c => c.charCodeAt(0))

		return buf
	}

	if ( ! ( 'fromBase64' in Uint8Array ) ) {
		$.$mol_base64_decode = $mol_base64_decode_web
	}
}
