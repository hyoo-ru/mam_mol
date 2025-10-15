namespace $ {

	function binary_string(bytes: Uint8Array< ArrayBuffer > | string): string {
		let binary = ''
		if (typeof bytes !== 'string') {
			for (const byte of bytes) binary += String.fromCharCode( byte )
		} else {
			binary = unescape(encodeURIComponent(bytes))
		}

		return binary
	}

	const base_encode = $.$mol_base64_encode

	export function $mol_base64_encode_web(str: string | Uint8Array<ArrayBuffer>, options?: $mol_base64_encode_options): string {
		if ('toBase64' in Uint8Array.prototype) return base_encode(str, options)

		let encoded = $mol_dom_context.btoa(binary_string(str))

		if (options?.alphabet === 'base64url') encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_')
		if (options?.omitPadding) return encoded.replace(/\=/g, '')

		return encoded
	}

	$.$mol_base64_encode = $mol_base64_encode_web
}
