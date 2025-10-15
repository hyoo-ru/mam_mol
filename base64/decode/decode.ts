namespace $ {

	type Uint8ArrayAdvanced = typeof Uint8Array & {
		fromBase64(str: string, options?: {
			alphabet?: 'base64url' | 'base64'
			latChunkHandling?: 'loose' | 'strict' | 'stop-before-partial'
		}): Uint8Array<ArrayBuffer>
	}

	export function $mol_base64_decode(base64: string): Uint8Array< ArrayBuffer > {
		return (Uint8Array as Uint8ArrayAdvanced).fromBase64(base64)
	}
}
