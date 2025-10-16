namespace $ {

	export function $mol_base64_encode_node(str: string | Uint8Array< ArrayBuffer >): string {
		if (! str) return ''

		if ('toBase64' in Uint8Array.prototype) {
			const bytes = typeof str === 'string' ? $mol_charset_encode(str) : str
			return (bytes as unknown as { toBase64(): string }).toBase64()
		}

		const buf = Buffer.isBuffer(str) ? str : Buffer.from(str as string)

		return buf.toString('base64')
	}

	$.$mol_base64_encode = $mol_base64_encode_node
}
