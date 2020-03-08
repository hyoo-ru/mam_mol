namespace $ {

	function $mol_base64_binary(bytes: Uint8Array | string): string {
		let binary = ''
		if (typeof bytes !== 'string') {
			for (const byte of bytes) binary += String.fromCharCode( byte )
		} else {
			binary = unescape(encodeURIComponent(bytes))
		}

		return binary
	}

	export function $mol_base64_encode_web(str: string | Uint8Array): string {
		return $mol_dom_context.btoa($mol_base64_binary(str))
	}

	$.$mol_base64_encode = $mol_base64_encode_web

	export function $mol_base64_decode_web(base64Str: string): Uint8Array {
		return new Uint8Array($mol_dom_context.atob(base64Str).split('').map(c => c.charCodeAt(0)))
	}

	$.$mol_base64_decode = $mol_base64_decode_web
}
