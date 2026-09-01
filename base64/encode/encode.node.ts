namespace $ {

	export function $mol_base64_encode_node(str: Uint8Array< ArrayBuffer >): string {
		if (! str) return ''

		const buf = Buffer.isBuffer(str) ? str : Buffer.from(str)

		return buf.toString('base64')
	}

	if ( ! ( 'toBase64' in Uint8Array.prototype ) ) {
		$.$mol_base64_encode = $mol_base64_encode_node
	}
}
