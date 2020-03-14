namespace $ {
	export function $mol_base64_decode_node(base64Str: string): Uint8Array {
		// without Uint8Array breaks $mol_compare_deep
		return new Uint8Array(Buffer.from(base64Str, 'base64'))
	}

	$.$mol_base64_decode = $mol_base64_decode_node
}
