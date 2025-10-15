namespace $ {

	type Uint8ArrayAdvanced = Uint8Array<ArrayBuffer> & {
		toBase64(options?: {
			alphabet?: 'base64url' | 'base64'
			omitPadding?: boolean
		}): string
	}

	export function $mol_base64_encode(str: string | Uint8Array< ArrayBuffer >): string {
		const bytes = (
			typeof str === 'string' ? $mol_charset_encode(str) : str
		) as Uint8ArrayAdvanced

		return bytes.toBase64()
	}
}
