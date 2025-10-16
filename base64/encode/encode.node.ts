namespace $ {

	export function $mol_base64_encode_node(str: Uint8Array< ArrayBuffer >): string {
		if (! str) return ''

		if ('toBase64' in Uint8Array.prototype) {
			return (str as unknown as { toBase64(): string }).toBase64()
		}

		const buf = Buffer.isBuffer(str) ? str : Buffer.from(str)

		return buf.toString('base64')
	}

	$.$mol_base64_encode = $mol_base64_encode_node
}
