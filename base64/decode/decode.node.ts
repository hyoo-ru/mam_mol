namespace $ {
	export function $mol_base64_decode_node(base64Str: string): Uint8Array< ArrayBuffer > {

		if ('fromBase64' in Uint8Array) return (Uint8Array as {
			fromBase64(str: string): Uint8Array<ArrayBuffer>
		}).fromBase64(base64Str)

		// without Uint8Array breaks $mol_compare_deep
		const buffer = Buffer.from(base64Str, 'base64')

		return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
	}

	$.$mol_base64_decode = $mol_base64_decode_node
}
