namespace $ {
	const TextEncoder = globalThis.TextEncoder ?? $node.util.TextEncoder

	const encoder = new TextEncoder()

	export function $mol_charset_encode(value: string) {
		return encoder.encode(value) as Uint8Array< ArrayBuffer >
	}

}
