namespace $ {
	export function $mol_base64_decode(base64: string): Uint8Array< ArrayBuffer > {
		return (Uint8Array as unknown as {
			fromBase64(str: string): Uint8Array<ArrayBuffer>
		}).fromBase64(base64)
	}
}
