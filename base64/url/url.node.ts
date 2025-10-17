namespace $ {
	
	export function $mol_base64_url_encode_node( str: Uint8Array< ArrayBuffer > ) {
		if (! str) return ''

		const buf = Buffer.isBuffer(str) ? str : Buffer.from(str)

		return buf.toString('base64url').replace( /=/g, '' )
	}

	if ( ! ( 'toBase64' in Uint8Array.prototype ) ) {
		$.$mol_base64_url_encode = $mol_base64_url_encode_node
	}

	export function $mol_base64_url_decode_node( str: string ) {
		// without Uint8Array breaks $mol_compare_deep
		const buffer = Buffer.from(str, 'base64url')

		return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
	}

	if ( ! ( 'fromBase64' in Uint8Array ) ) {
		$.$mol_base64_url_decode = $mol_base64_url_decode_node
	}
	
}
