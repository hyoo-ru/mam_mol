namespace $ {
	export function $mol_base64_decode_string(base64: string): string {
		return new TextDecoder().decode($mol_base64_decode(base64))
	}
}
