namespace $ {

	export function $mol_base64_encode_node(str: string | Uint8Array): string {
		if (! str) return ''
		return Buffer.isBuffer(str) ? str.toString('base64') : Buffer.from(str).toString('base64')
	}

	$.$mol_base64_encode = $mol_base64_encode_node
}
