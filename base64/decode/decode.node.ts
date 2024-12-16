namespace $ {
	export function $mol_base64_decode_node(base64Str: string): Uint8Array< ArrayBuffer > {
		
		base64Str = base64Str.replace( /-/g, '+' ).replace( /_/g, '/' )
		
		// without Uint8Array breaks $mol_compare_deep
		const buffer = Buffer.from(base64Str, 'base64')

		return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
	}

	$.$mol_base64_decode = $mol_base64_decode_node
}
