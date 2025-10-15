namespace $ {

	type Uint8ArrayAdvanced = Uint8Array<ArrayBuffer> & {
		toBase64(options?: $mol_base64_encode_options): string
	}

	export type $mol_base64_encode_options = {
		alphabet?: 'base64url' | 'base64'
		omitPadding?: boolean
	}

	export function $mol_base64_encode(str: string | Uint8Array< ArrayBuffer >, options?: $mol_base64_encode_options): string {
		const bytes = (
			typeof str === 'string' ? $mol_charset_encode(str) : str
		) as Uint8ArrayAdvanced

		return bytes.toBase64(options)
	}
}
