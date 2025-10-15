namespace $ {

	const base_encode = $.$mol_base64_encode

	export function $mol_base64_encode_node(str: string | Uint8Array< ArrayBuffer >, options?: $mol_base64_encode_options): string {
		if (! str) return ''
		if ('toBase64' in Uint8Array.prototype) return base_encode(str, options)

		const buf = Buffer.isBuffer(str) ? str : Buffer.from(str as string)

		let encoded = buf.toString(options?.alphabet ?? 'base64')

		if (options?.omitPadding) return encoded.replace(/\=/g, '')

		return encoded
	}

	$.$mol_base64_encode = $mol_base64_encode_node
}
