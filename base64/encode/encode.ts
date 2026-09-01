namespace $ {
	export function $mol_base64_encode(src: Uint8Array< ArrayBuffer >): string {
		return (src as unknown as { toBase64(): string }).toBase64()
}
}
