namespace $ {
	export function $mol_base64_decode_string(base64: string): string {
		return $mol_charset_decode($mol_base64_decode(base64))
	}
}
