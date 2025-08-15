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

	export function $mol_base64_encode_web(str: string | Uint8Array< ArrayBuffer >): string {
		return $mol_dom_context.btoa(binary_string(str))
	}

	$.$mol_base64_encode = $mol_base64_encode_web
}
