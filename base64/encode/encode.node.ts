namespace $ {

	const base_encode = $.$mol_base64_encode

	export function $mol_base64_encode_node(str: string | Uint8Array< ArrayBuffer >): string {
		if (! str) return ''
		if ('toBase64' in Uint8Array.prototype) return base_encode(str)

		if (Buffer.isBuffer(str)) return str.toString('base64')

		return Buffer.from(str as string).toString('base64')
	}

	$.$mol_base64_encode = $mol_base64_encode_node
}
