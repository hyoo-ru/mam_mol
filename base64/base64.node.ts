namespace $ {

	export function $mol_base64_encode_node(str: string | Uint8Array): string {
		if (! str) return ''
		return Buffer.isBuffer(str) ? str.toString('base64') : Buffer.from(str).toString('base64')
	}

	$.$mol_base64_encode = $mol_base64_encode_node

	export function $mol_base64_decode_node(base64Str: string): Uint8Array {
		return Buffer.from(base64Str, 'base64')
	}

	$.$mol_base64_decode = $mol_base64_decode_node
}
